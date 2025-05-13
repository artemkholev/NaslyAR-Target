package main

import (
	"log"
	"os"
	"time"

	_ "github.com/GoAdminGroup/go-admin/adapter/gin"
	_ "github.com/GoAdminGroup/go-admin/modules/db/drivers/postgres"
	_ "github.com/GoAdminGroup/themes/adminlte"

	"github.com/GoAdminGroup/go-admin/template"
	"github.com/GoAdminGroup/go-admin/template/chartjs"

	"backend/configs"
	"backend/internal/app/models"
	"backend/internal/app/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Инициализация Gin
	r := gin.Default()

	// Подключение к основной базе данных приложения
	configs.ConnectDB()
	runAppMigrations()

	// Добавление компонентов
	template.AddComp(chartjs.NewChart())

	// Настройка статических файлов
	r.Static("/assets", "./public/assets")
	r.Static("/uploads", "./uploads")

	// Middleware
	configureMiddleware(r)

	// Основные роуты приложения
	routes.SetupRoutes(r)

	// Запуск сервера
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on :%s", port)
	log.Fatal(r.Run(":" + port))
}

func runAppMigrations() {
	err := configs.DB.AutoMigrate(
		&models.User{},
		&models.Request{},
		&models.RefreshToken{},
		&models.VerificationToken{},
		&models.Notification{},
	)
	if err != nil {
		log.Fatal("App migrations failed:", err)
	}
	log.Println("App migrations completed")
}

func configureMiddleware(r *gin.Engine) {
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
}
