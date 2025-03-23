package controllers

import (
	"net/http"

	"backend/configs"
	"backend/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// GetCurrentUser возвращает данные текущего пользователя
func GetCurrentUser(c *gin.Context) {
	// Извлекаем пользователя из контекста
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Пользователь не найден"})
		return
	}

	// Приводим к типу models.User
	currentUser, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении данных пользователя"})
		return
	}

	// Создаем UserResponse с нужными полями
	userResponse := models.UserResponse{
		ID:        currentUser.ID,
		Email:     currentUser.Email,
		FirstName: currentUser.FirstName,
		LastName:  currentUser.LastName,
		Phone:     currentUser.Phone,
		Role:      currentUser.Role,
	}

	// Возвращаем данные пользователя
	c.JSON(http.StatusOK, gin.H{"data": userResponse})
}

// GetUsers возвращает список всех пользователей
func GetUsers(c *gin.Context) {
	var users []models.User
	if err := configs.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении списка пользователей"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": users})
}

// GetUserByID возвращает пользователя по ID
func GetUserByID(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	if err := configs.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Пользователь не найден"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// UpdateUser обновляет данные пользователя
func UpdateUser(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	if err := configs.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Пользователь не найден"})
		return
	}

	// Привязываем новые данные
	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректные данные"})
		return
	}

	// Обновляем email, если он передан
	if input.Email != "" {
		user.Email = input.Email
	}

	// Обновляем пароль, если он передан
	if input.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при хешировании пароля"})
			return
		}
		user.Password = string(hashedPassword)
	}

	// Сохраняем изменения в базе данных
	if err := configs.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при обновлении пользователя"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// DeleteUser удаляет пользователя по ID
func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	if err := configs.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Пользователь не найден"})
		return
	}

	if err := configs.DB.Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при удалении пользователя"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Пользователь успешно удалён"})
}
