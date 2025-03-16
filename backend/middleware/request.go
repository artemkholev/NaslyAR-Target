package middleware

import "github.com/gin-gonic/gin"

func ReferrerPolicyMiddleware(policy string) gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Referrer-Policy", policy)
        c.Next()
    }
}