package controllers

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"time"

	"backend/configs"
	"backend/email"
	"backend/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// Register обрабатывает регистрацию нового пользователя
func Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректные данные"})
		return
	}

	// Валидация email
	if !validateEmail(user.Email) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректный email"})
		return
	}

	// Валидация пароля
	if !validatePassword(user.Password) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы, цифры и специальные символы (!@#$%^&*)."})
		return
	}

	// Хеширование пароля
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при хешировании пароля"})
		return
	}
	user.Password = string(hashedPassword)
	user.IsVerified = false // Пользователь не подтверждён

	// Сохранение пользователя в базу данных
	if err := configs.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при создании пользователя"})
		return
	}

	// Генерация токена подтверждения
	token, err := generateRandomToken()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при генерации токена подтверждения"})
		return
	}

	// Сохранение токена в базу данных
	expiresAt := time.Now().Add(time.Hour) // Токен действителен 1 час
	verificationToken := models.VerificationToken{
		UserID:    user.ID,
		Token:     token,
		ExpiresAt: expiresAt,
	}
	if err := configs.DB.Create(&verificationToken).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при сохранении токена подтверждения"})
		return
	}

	// Отправка письма с ссылкой для подтверждения
	if err := SendVerificationEmail(user.Email, token); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при отправке письма с подтверждением"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Пользователь успешно зарегистрирован. Проверьте вашу почту для подтверждения."})
}

// validateEmail проверяет, что email соответствует формату
func validateEmail(email string) bool {
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	match, _ := regexp.MatchString(emailRegex, email)
	return match
}

// validatePassword проверяет, что пароль соответствует требованиям
func validatePassword(password string) bool {
	if len(password) < 8 {
		return false
	}
	hasUpperCase := regexp.MustCompile(`[A-Z]`).MatchString(password)
	hasLowerCase := regexp.MustCompile(`[a-z]`).MatchString(password)
	hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)
	hasSpecialChar := regexp.MustCompile(`[!@#$%^&*]`).MatchString(password)
	return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
}

// VerifyEmail обрабатывает подтверждение email
func VerifyEmail(c *gin.Context) {
	// Получаем токен из query-параметра
	token := c.Query("token")
	if token == "" {
		renderConfirmationPage(c, "Ошибка: Отсутствует токен подтверждения", "error", false)
		return
	}

	// Начинаем транзакцию в базе данных
	tx := configs.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback() // Откатываем транзакцию в случае паники
		}
	}()

	// Ищем токен в базе данных
	var verificationToken models.VerificationToken
	if err := tx.Where("token = ?", token).First(&verificationToken).Error; err != nil {
		tx.Rollback()
		renderConfirmationPage(c, "Ошибка: Неверный или истёкший токен подтверждения", "error", false)
		return
	}

	// Проверяем, истёк ли срок действия токена
	if time.Now().After(verificationToken.ExpiresAt) {
		tx.Rollback()
		renderConfirmationPage(c, "Ошибка: Срок действия токена истёк", "error", false)
		return
	}

	// Ищем пользователя, связанного с токеном
	var user models.User
	if err := tx.First(&user, verificationToken.UserID).Error; err != nil {
		tx.Rollback()
		renderConfirmationPage(c, "Ошибка: Не удалось найти пользователя", "error", false)
		return
	}

	// Подтверждаем email пользователя
	user.IsVerified = true
	if err := tx.Model(&user).Updates(map[string]interface{}{"is_verified": true}).Error; err != nil {
		tx.Rollback()
		renderConfirmationPage(c, "Ошибка: Не удалось подтвердить пользователя", "error", false)
		return
	}

	// Удаляем использованный токен
	if err := tx.Delete(&verificationToken).Error; err != nil {
		tx.Rollback()
		renderConfirmationPage(c, "Ошибка: Не удалось удалить токен подтверждения", "error", false)
		return
	}

	// Завершаем транзакцию
	if err := tx.Commit().Error; err != nil {
		renderConfirmationPage(c, "Ошибка: Не удалось завершить транзакцию", "error", false)
		return
	}

	// Успешное подтверждение
	renderConfirmationPage(c, "Ваш email успешно подтверждён!", "success", true)
}

// renderConfirmationPage отображает HTML-страницу с результатом подтверждения
func renderConfirmationPage(c *gin.Context, message, messageClass string, success bool) {
	c.HTML(http.StatusOK, "confirm.html", gin.H{
		"Message":        message,
		"MessageClass":   messageClass,
		"Success":        success,
		"AppFrontendURL": os.Getenv("APP_FRONTEND_URL"),
	})
}

// Login обрабатывает вход пользователя в систему
func Login(c *gin.Context) {
	var input struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=8"`
	}
	var user models.User

	// Привязываем и валидируем входящие данные
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректные данные: " + err.Error()})
		return
	}

	// Поиск пользователя по email
	if err := configs.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверные учетные данные"})
		return
	}

	// Проверка подтверждения email
	if !user.IsVerified {
		c.JSON(http.StatusForbidden, gin.H{"error": "Email не подтверждён"})
		return
	}

	// Проверка пароля
	if err := user.CheckPassword(input.Password); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверные учетные данные"})
		return
	}

	// Генерация JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при генерации токена"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// generateRandomToken генерирует случайный токен для подтверждения email
func generateRandomToken() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", fmt.Errorf("ошибка при генерации токена: %w", err)
	}
	return base64.URLEncoding.EncodeToString(b), nil
}

// SendVerificationEmail отправляет письмо с подтверждением
func SendVerificationEmail(userEmail, token string) error {
	// Формируем ссылку для подтверждения
	verificationLink := os.Getenv("APP_BACKEND_URL") + "/auth/verify?token=" + url.QueryEscape(token)

	// Формируем тело письма
	body := fmt.Sprintf(`
		<p>Здравствуйте!</p>
		<p>Для подтверждения регистрации перейдите по <a href="%s">ссылке</a>.</p>
		<p>Если вы не регистрировались, проигнорируйте это письмо.</p>
	`, verificationLink)

	// Отправляем письмо
	if err := email.SendEmail(userEmail, "Подтверждение регистрации", body); err != nil {
		return fmt.Errorf("ошибка при отправке письма с подтверждением: %w", err)
	}

	return nil
}
