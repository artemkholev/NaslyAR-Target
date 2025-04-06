package admin

import (
	"backend/internal/admin/models"

	"github.com/GoAdminGroup/go-admin/plugins/admin/modules/table"
)

// GetTables возвращает генераторы таблиц для админ-панели
func GetTables() table.GeneratorList {
	return map[string]table.Generator{
		"users":    models.GetUserTable,
		"requests": models.GetRequestTable,
		// Добавьте другие таблицы
	}
}
