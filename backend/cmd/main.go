package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"backend/configs"
	"backend/models"
	"backend/routes"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to the database
	configs.ConnectDB()

	// Run database migrations
	err := configs.DB.AutoMigrate(&models.User{}, &models.Request{})
	if err != nil {
		log.Fatal("Migration failed:", err)
	}
	log.Println("Database migrated successfully!")

	// Initialize Gin router
	r := gin.Default()
	routes.SetupRoutes(r)

	// Run the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Fatal(r.Run(":" + port))
}
