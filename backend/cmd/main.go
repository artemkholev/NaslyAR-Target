package main

import (
	"log"
	"os"

	"backend/configs"
	"backend/models"
	"backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	r := gin.Default()

	// Настройка CORS
	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Разрешённые источники (например, фронтенд)
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,         // Разрешить использование cookies и аутентификации
		MaxAge:           12 * 60 * 60, // Кэширование политики CORS на 12 часов
	}

	r.Use(cors.New(corsConfig))
	r.LoadHTMLGlob("templates/*")

	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to the database
	configs.ConnectDB()

	// Run database migrations
	err := configs.DB.AutoMigrate(&models.User{}, &models.Request{}, &models.VerificationToken{})
	if err != nil {
		log.Fatal("Migration failed:", err)
	}
	log.Println("Database migrated successfully!")

	// Setup routes
	routes.SetupRoutes(r)

	// Run the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Fatal(r.Run(":" + port))
}
