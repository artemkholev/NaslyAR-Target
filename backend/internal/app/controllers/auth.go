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
	"backend/pkg/utils/email"
	"backend/internal/app/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// //////////////////////// Register //////////////////////////
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

	// Генерация access и refresh токенов
	accessToken, refreshToken, err := generateTokens(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при генерации токенов"})
		return
	}

	// Сохраняем refresh токен в базе данных
	refreshTokenRecord := models.RefreshToken{
		Token:     refreshToken,
		UserID:    user.ID,
		ExpiresAt: time.Now().Add(7 * 24 * time.Hour), // 7 дней
	}
	if err := configs.DB.Create(&refreshTokenRecord).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при сохранении refresh token"})
		return
	}

	// Сохраняем refresh token в HttpOnly cookie
	c.SetCookie("refresh_token", refreshToken, 7*24*60*60, "/", os.Getenv("APP_FRONTEND_DOMAIN"), false, true)

	// Отправляем access token в теле ответа
	c.JSON(http.StatusCreated, gin.H{
		"message":      "Пользователь успешно зарегистрирован. Проверьте вашу почту для подтверждения.",
		"success":      true,
		"access_token": accessToken,
	})
}

// //////////////////////// Login //////////////////////////
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
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверные учетные данные"})
		return
	}

	// Генерация access и refresh токенов
	accessToken, refreshToken, err := generateTokens(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при генерации токенов"})
		return
	}

	// Сохраняем refresh токен в базе данных
	refreshTokenRecord := models.RefreshToken{
		Token:     refreshToken,
		UserID:    user.ID,
		ExpiresAt: time.Now().Add(7 * 24 * time.Hour), // 7 дней
	}
	if err := configs.DB.Create(&refreshTokenRecord).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при сохранении refresh token"})
		return
	}

	// Сохраняем refresh токен в HttpOnly cookie
	c.SetCookie(
		"refresh_token",                  // Имя cookie
		refreshToken,                     // Значение cookie
		7*24*60*60,                       // Время жизни cookie (7 дней)
		"/",                              // Путь
		os.Getenv("APP_FRONTEND_DOMAIN"), // Домен
		false,                            // Secure (false для HTTP, true для HTTPS)
		true,                             // HttpOnly (запретить доступ к cookie через JavaScript)
	)

	// Отправляем access token в теле ответа
	c.JSON(http.StatusOK, gin.H{
		"access_token": accessToken,
		"success":      true,
	})
}

// ////////////////////// Logout //////////////////////////
func Logout(c *gin.Context) {
	// Получаем refresh token из cookie
	refreshToken, err := c.Cookie("refresh_token")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Refresh token отсутствует"})
		return
	}

	// Удаляем refresh token из базы данных
	if err := configs.DB.Where("token = ?", refreshToken).Delete(&models.RefreshToken{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при выходе из системы"})
		return
	}

	// Удаляем refresh token из cookie
	c.SetCookie(
		"refresh_token",                  // Имя cookie
		"",                               // Пустое значение
		-1,                               // Время жизни cookie (удалить)
		"/",                              // Путь
		os.Getenv("APP_FRONTEND_DOMAIN"), // Домен
		false,                            // Secure (false для HTTP, true для HTTPS)
		true,                             // HttpOnly (запретить доступ к cookie через JavaScript)
	)

	c.JSON(http.StatusOK, gin.H{"message": "Успешный выход из системы", "success": true})
}

// ////////////////////// Refresh //////////////////////////
func Refresh(c *gin.Context) {
	// Извлекаем refresh token из cookie
	refreshToken, err := c.Cookie("refresh_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Отсутствует refresh token"})
		return
	}

	// Ищем refresh token в базе данных
	var refreshTokenRecord models.RefreshToken
	if err := configs.DB.Where("token = ?", refreshToken).First(&refreshTokenRecord).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверный refresh token"})
		return
	}

	// Проверяем, не истёк ли refresh token
	if time.Now().After(refreshTokenRecord.ExpiresAt) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Refresh token истёк"})
		return
	}

	// Генерация нового access токена
	accessToken, _, err := generateTokens(refreshTokenRecord.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при генерации нового токена"})
		return
	}

	// Отправляем новый access token
	c.JSON(http.StatusOK, gin.H{"access_token": accessToken, "success": true})
}

// ////////////////////// VerifyEmail //////////////////////////
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

// validateToken проверяет и декодирует JWT-токен
func validateToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("неверный метод подписи")
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, fmt.Errorf("недействительный токен")
}

// Генерация access и refresh токенов
func generateTokens(userID uuid.UUID) (string, string, error) {
	expirationTime := time.Now().Add(24 * time.Hour).Unix()            // Access token срок действия 1 день
	refreshExpirationTime := time.Now().Add(7 * 24 * time.Hour).Unix() // Refresh token срок действия 7 дней

	// Создание access token
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     expirationTime,
	})
	accessTokenString, err := accessToken.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", "", err
	}

	// Создание refresh token
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     refreshExpirationTime,
	})
	refreshTokenString, err := refreshToken.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", "", err
	}

	return accessTokenString, refreshTokenString, nil
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

// renderConfirmationPage отображает HTML-страницу с результатом подтверждения
func renderConfirmationPage(c *gin.Context, message, messageClass string, success bool) {
	c.HTML(http.StatusOK, "confirm.html", gin.H{
		"Message":        message,
		"MessageClass":   messageClass,
		"Success":        success,
		"AppFrontendURL": os.Getenv("APP_FRONTEND_URL"),
	})
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
