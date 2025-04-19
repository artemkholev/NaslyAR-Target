package controllers

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"backend/configs"
	"backend/internal/app/models"
	"backend/internal/app/repositories"
	"backend/pkg/utils/email"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"github.com/google/uuid"
)

// CreateRequest создает новый запрос
func CreateRequest(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Не удалось идентифицировать пользователя",
		})
		return
	}

	userUUID, ok := userID.(uuid.UUID)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Некорректный формат ID пользователя",
		})
		return
	}

	var input struct {
		Phone       string `json:"phone" binding:"required"`
		Niche       string `json:"niche" binding:"required"`
		Title       string `json:"title"`
		Description string `json:"description"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Некорректные данные",
			"details": getValidationErrors(err),
		})
		return
	}

	if input.Title == "" {
		input.Title = fmt.Sprintf("Рекламный запрос: %s", input.Niche)
	}

	request := models.Request{
		UserID:      userUUID,
		Phone:       input.Phone,
		Niche:       input.Niche,
		Title:       input.Title,
		Description: input.Description,
		Status:      "pending",
	}

	if err := configs.DB.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Ошибка при создании запроса",
			"details": err.Error(),
		})
		return
	}

	go func(r models.Request) {
		sendAdminNotification(r)
	}(request)

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"data":    request,
	})
}

// GetRequests возвращает список всех запросов
func GetRequests(c *gin.Context) {
	var requests []models.Request
	if err := configs.DB.Find(&requests).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Ошибка при получении списка запросов",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": requests})
}

// GetRequestByID возвращает запрос по ID
func GetRequestByID(c *gin.Context) {
	id := c.Param("id")

	var request models.Request
	if err := configs.DB.First(&request, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Запрос не найден"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": request})
}

// UpdateRequest обновляет данные запроса
func UpdateRequest(c *gin.Context) {
	id := c.Param("id")

	var request models.Request
	if err := configs.DB.First(&request, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Запрос не найден"})
		return
	}

	var input struct {
		Phone       string `json:"phone"`
		Niche       string `json:"niche"`
		Title       string `json:"title"`
		Description string `json:"description"`
		Status      string `json:"status"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Некорректные данные",
			"details": getValidationErrors(err),
		})
		return
	}

	// Обновляем только переданные поля
	if input.Phone != "" {
		request.Phone = input.Phone
	}
	if input.Niche != "" {
		request.Niche = input.Niche
	}
	if input.Title != "" {
		request.Title = input.Title
	}
	if input.Description != "" {
		request.Description = input.Description
	}
	if input.Status != "" {
		request.Status = input.Status
	}

	if err := configs.DB.Save(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Ошибка при обновлении запроса",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": request})
}

// DeleteRequest удаляет запрос по ID
func DeleteRequest(c *gin.Context) {
	id := c.Param("id")

	var request models.Request
	if err := configs.DB.First(&request, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Запрос не найден"})
		return
	}

	if err := configs.DB.Delete(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Ошибка при удалении запроса",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Запрос успешно удалён"})
}

// Вспомогательная функция для получения ошибок валидации
func getValidationErrors(err error) map[string]string {
	errors := make(map[string]string)
	if validationErrors, ok := err.(validator.ValidationErrors); ok {
		for _, fieldError := range validationErrors {
			field := strings.ToLower(fieldError.Field())
			switch fieldError.Tag() {
			case "required":
				errors[field] = "Поле обязательно для заполнения"
			case "numeric":
				errors[field] = "Должно быть числом"
			default:
				errors[field] = "Некорректное значение"
			}
		}
	}
	return errors
}

// NotifyAdminAboutNewRequest отправляет уведомление админу о новой заявке
func NotifyAdminAboutNewRequest(adminEmail, requestDetails string) error {
	subject := "Новая заявка"
	body := fmt.Sprintf(`
		<p>Здравствуйте!</p>
		<p>Поступила новая заявка:</p>
		<pre>%s</pre>
	`, requestDetails)

	if err := email.SendEmail(adminEmail, subject, body); err != nil {
		return fmt.Errorf("ошибка при отправке уведомления админу: %w", err)
	}

	return nil
}

func sendAdminNotification(request models.Request) {
	// Получаем email админа из БД
	adminEmail, err := repositories.GetAdminEmail()
	if err != nil {
		log.Printf("Failed to get admin email: %v", err)
		return
	}

	// Формируем детали запроса
	requestDetails := fmt.Sprintf(`
		<h3>Новый рекламный запрос</h3>
		<p><strong>ID:</strong> %s</p>
		<p><strong>Пользователь:</strong> %s</p>
		<p><strong>Телефон:</strong> %s</p>
		<p><strong>Ниша:</strong> %s</p>
		<p><strong>Заголовок:</strong> %s</p>
		<p><strong>Описание:</strong> %s</p>
	`, request.ID, request.UserID, request.Phone, request.Niche, request.Title, request.Description)

	// Отправляем письмо
	if err := NotifyAdminAboutNewRequest(adminEmail, requestDetails); err != nil {
		log.Printf("Ошибка отправки уведомления админу %s: %v", adminEmail, err)
	}
}
