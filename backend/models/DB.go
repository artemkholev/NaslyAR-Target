package models

import (
	"log"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Глобальная переменная DB
var DB *gorm.DB

// InitializeDB инициализирует подключение к базе данных
func InitializeDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Автоматическая миграция таблиц
	DB.AutoMigrate(&User{})
}
