package controllers

import (
	"fmt"
	"net/http"

	"backend/configs"
	"backend/pkg/utils/email"
	"backend/internal/app/models"

	"github.com/gin-gonic/gin"
)

// CreateRequest создает новый запрос
func CreateRequest(c *gin.Context) {
	var input struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description" binding:"required"`
		UserID      uint   `json:"user_id" binding:"required"`
	}

	// Привязываем и проверяем входящие данные
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректные данные: " + err.Error()})
		return
	}

	// Создаем запрос
	request := models.Request{
		Title:       input.Title,
		Description: input.Description,
		UserID:      input.UserID,
	}

	// Сохраняем запрос в базу данных
	if err := configs.DB.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при создании запроса"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": request})
}

// GetRequests возвращает список всех запросов
func GetRequests(c *gin.Context) {
	var requests []models.Request
	if err := configs.DB.Find(&requests).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении списка запросов"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": requests})
}

// GetRequestByID возвращает запрос по ID
func GetRequestByID(c *gin.Context) {
	id := c.Param("id")

	var request models.Request
	if err := configs.DB.First(&request, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Запрос не найден"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": request})
}

// UpdateRequest обновляет данные запроса
func UpdateRequest(c *gin.Context) {
	id := c.Param("id")

	var request models.Request
	if err := configs.DB.First(&request, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Запрос не найден"})
		return
	}

	// Привязываем новые данные
	var input struct {
		Title       string `json:"title"`
		Description string `json:"description"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректные данные"})
		return
	}

	// Обновляем поля, если они переданы
	if input.Title != "" {
		request.Title = input.Title
	}
	if input.Description != "" {
		request.Description = input.Description
	}

	// Сохраняем изменения в базе данных
	if err := configs.DB.Save(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при обновлении запроса"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": request})
}

// DeleteRequest удаляет запрос по ID
func DeleteRequest(c *gin.Context) {
	id := c.Param("id")

	var request models.Request
	if err := configs.DB.First(&request, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Запрос не найден"})
		return
	}

	if err := configs.DB.Delete(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при удалении запроса"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Запрос успешно удалён"})
}

// NotifyAdminAboutNewRequest отправляет уведомление админу о новой заявке
func NotifyAdminAboutNewRequest(adminEmail, requestDetails string) error {
	subject := "Новая заявка"
	body := fmt.Sprintf(`
		<p>Здравствуйте!</p>
		<p>Поступила новая заявка:</p>
		<p>%s</p>
	`, requestDetails)

	if err := email.SendEmail(adminEmail, subject, body); err != nil {
		return fmt.Errorf("ошибка при отправке уведомления админу: %w", err)
	}

	return nil
}
