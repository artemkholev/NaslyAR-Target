package routes

import (
	"backend/internal/app/controllers"
	"backend/pkg/middleware"

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
			requestsGroup.POST("/change-request-status", controllers.ChangeRequestStatus)
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

	// goAdmin
	
}
