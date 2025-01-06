package routes

import (
	"github.com/gin-gonic/gin"
	"backend/controllers"
	"backend/middleware"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/requests", controllers.CreateRequest)
		protected.GET("/requests", controllers.GetRequests)
	}
}
