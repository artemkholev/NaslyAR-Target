package controllers

import (
	"net/http"

	"backend/configs"
	"backend/internal/app/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// GetMainTariffs возвращает тарифы для отображения на главной странице
func GetMainTariffs(c *gin.Context) {
	var tariffs []models.Tariff
	if err := configs.DB.Preload("Features").Where("show_on_main_page = ?", true).Find(&tariffs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении тарифов"})
		return
	}
	c.JSON(http.StatusOK, tariffs)
}

// GetAllTariffs возвращает полный список тарифов
func GetAllTariffs(c *gin.Context) {
	var tariffs []models.Tariff
	if err := configs.DB.Preload("Features").Find(&tariffs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при получении тарифов"})
		return
	}
	c.JSON(http.StatusOK, tariffs)
}

// GetTariffByID возвращает тариф по ID
func GetTariffByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверный ID"})
		return
	}

	var tariff models.Tariff
	if err := configs.DB.Preload("Features").First(&tariff, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Тариф не найден"})
		return
	}

	c.JSON(http.StatusOK, tariff)
}
