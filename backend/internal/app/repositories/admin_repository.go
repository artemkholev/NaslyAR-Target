package repositories

import (
	"backend/configs"
	"backend/internal/app/models"
)

func GetAdminEmail() (string, error) {
	var admin models.User
	if err := configs.DB.Where("role = ?", "admin").First(&admin).Error; err != nil {
		return "", err
	}
	return admin.Email, nil
}
