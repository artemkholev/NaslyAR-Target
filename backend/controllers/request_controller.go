package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"backend/configs"
	"backend/models"
)

func CreateRequest(c *gin.Context) {
	var request models.Request
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	configs.DB.Create(&request)
	c.JSON(http.StatusCreated, gin.H{"message": "Request created", "request": request})
}

func GetRequests(c *gin.Context) {
	var requests []models.Request
	configs.DB.Find(&requests)
	c.JSON(http.StatusOK, requests)
}
