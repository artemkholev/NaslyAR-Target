package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Группа для аутентификации
	authGroup := r.Group("/auth")
	{
		authGroup.POST("/register", controllers.Register)
		authGroup.POST("/login", controllers.Login)
		authGroup.POST("/logout", controllers.Logout)
		authGroup.GET("/verify", controllers.VerifyEmail)
	}

	// Группа для защищенных маршрутов
	apiGroup := r.Group("/api")
	apiGroup.Use(middleware.AuthMiddleware())
	{
		apiGroup.GET("/me", controllers.GetCurrentUser)

		requestsGroup := apiGroup.Group("/requests")
		{
			requestsGroup.POST("/", controllers.CreateRequest)
			requestsGroup.GET("/", controllers.GetRequests)
			requestsGroup.GET("/:id", controllers.GetRequestByID)
			requestsGroup.PUT("/:id", controllers.UpdateRequest)
			requestsGroup.DELETE("/:id", controllers.DeleteRequest)
		}

		usersGroup := apiGroup.Group("/users")
		{
			usersGroup.GET("/", controllers.GetUsers)
			usersGroup.GET("/:id", controllers.GetUserByID)
			usersGroup.PUT("/:id", controllers.UpdateUser)
			usersGroup.DELETE("/:id", controllers.DeleteUser)
		}
	}
}
