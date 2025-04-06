package admin

import (
	_ "github.com/GoAdminGroup/go-admin/adapter/gin"                 // Gin адаптер
	_ "github.com/GoAdminGroup/go-admin/modules/db/drivers/postgres" // Драйвер PostgreSQL
	_ "github.com/GoAdminGroup/themes/adminlte"                      // Тема adminlte

	"github.com/gin-gonic/gin"
)

// Инициализация GoAdmin
func InitAdmin(r *gin.Engine) {

}
