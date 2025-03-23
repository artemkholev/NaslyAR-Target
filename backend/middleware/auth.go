package middleware

import (
	"net/http"
	"os"

	"backend/configs"
	"backend/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// AuthMiddleware проверяет access token и добавляет информацию о пользователе в контекст
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Получаем токен из заголовка Authorization
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Требуется авторизация"})
			c.Abort()
			return
		}

		// Проверяем формат токена (Bearer <token>)
		tokenString := authHeader[len("Bearer "):]
		if tokenString == authHeader {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверный формат токена"})
			c.Abort()
			return
		}

		// Парсим токенtoken
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})
		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверный токен"})
			c.Abort()
			return
		}

		// Извлекаем claims из токена
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверные данные токена"})
			c.Abort()
			return
		}

		// Получаем user_id из токена (UUID в виде строки)
		userIDStr, ok := claims["user_id"].(string)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверный формат user_id в токене"})
			c.Abort()
			return
		}

		// Преобразуем строку в UUID
		userID, err := uuid.Parse(userIDStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Неверный формат UUID"})
			c.Abort()
			return
		}

		// Ищем пользователя в базе данных
		var user models.User
		if err := configs.DB.Where("id = ?", userID).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Пользователь не найден"})
			c.Abort()
			return
		}

		// Добавляем пользователя в контекст
		c.Set("user", user)
		c.Next()
	}
}
