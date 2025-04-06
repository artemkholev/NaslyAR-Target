package pages

import (
	"fmt"
	"strings"

	"backend/configs"
	"backend/internal/app/models"

	"github.com/GoAdminGroup/go-admin/context"
	"github.com/GoAdminGroup/go-admin/modules/config"
	"github.com/GoAdminGroup/go-admin/template"
	"github.com/GoAdminGroup/go-admin/template/types"
)

func DashboardPage(ctx *context.Context) (types.Panel, error) {
	components := template.Get(ctx, config.Get().Theme)

	var users []models.User
	if err := configs.DB.Order("created_at desc").Limit(10).Find(&users).Error; err != nil {
		return types.Panel{}, fmt.Errorf("ошибка при получении пользователей: %v", err)
	}

	// Рендер таблицы в HTML
	var builder strings.Builder
	builder.WriteString(`<table class="table table-bordered table-hover"><thead><tr>
		<th>ID</th><th>Email</th><th>Имя</th><th>Фамилия</th><th>Роль</th><th>Создан</th>
	</tr></thead><tbody>`)

	for _, user := range users {
		builder.WriteString("<tr>")
		builder.WriteString("<td>" + user.Email + "</td>")
		builder.WriteString("<td>" + user.FirstName + "</td>")
		builder.WriteString("<td>" + user.LastName + "</td>")
		builder.WriteString("<td>" + user.Role + "</td>")
		builder.WriteString("<td>" + user.CreatedAt.Format("2006-01-02 15:04") + "</td>")
		builder.WriteString("</tr>")
	}
	builder.WriteString("</tbody></table>")

	// Вставляем HTML таблицу в GoAdmin панель
	content := components.Row().SetContent(
		components.Col().SetSize(types.SizeMD(12)).
			SetContent(template.HTML(builder.String())).
			GetContent(),
	).GetContent()

	return types.Panel{
		Content:     content,
		Title:       "Главная",
		Description: "Последние пользователи",
	}, nil
}
