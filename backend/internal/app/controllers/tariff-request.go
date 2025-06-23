package controllers

import (
	"backend/configs"
	"backend/internal/app/constants"
	"backend/internal/app/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// CreateTariffRequest создает новый запрос
func CreateTariffRequest(c *gin.Context) {
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
		TariffTitle string `json:"phone" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Некорректные данные",
			"details": getValidationErrors(err),
		})
		return
	}

	request := models.TariffRequest{
		UserID:      userUUID,
		TariffTitle: input.TariffTitle,
		Status:      constants.Pending,
	}

	if err := configs.DB.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Ошибка при создании запроса",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"data":    request,
	})
}
