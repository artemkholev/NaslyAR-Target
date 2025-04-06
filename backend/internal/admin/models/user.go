package models

import (
	"github.com/GoAdminGroup/go-admin/context"
	"github.com/GoAdminGroup/go-admin/modules/db"
	"github.com/GoAdminGroup/go-admin/plugins/admin/modules/table"
	"github.com/GoAdminGroup/go-admin/template/types"
	"github.com/GoAdminGroup/go-admin/template/types/form"
)

func GetUserTable(ctx *context.Context) table.Table {
	t := table.NewDefaultTable(ctx)

	// Настройка отображения таблицы
	info := t.GetInfo()
	info.AddField("ID", "id", db.Bigint).FieldSortable()
	info.AddField("Name", "name", db.Varchar).
		FieldFilterable(types.FilterType{Operator: types.FilterOperatorLike})
	info.AddField("Email", "email", db.Varchar).FieldFilterable()
	info.AddField("Verified", "is_verified", db.Bool).
		FieldDisplay(func(value types.FieldModel) interface{} {
			if value.Value == "1" {
				return "✓"
			}
			return "✗"
		})
	info.AddField("Created At", "created_at", db.Timestamp).FieldSortable()
	info.SetTable("users").SetTitle("Users").SetDescription("User management")

	// Настройка формы
	formList := t.GetForm()

	// ID
	formList.AddField("ID", "id", db.Bigint, form.Default).FieldNotAllowAdd().FieldNotAllowEdit()

	// Name
	formList.AddField("Name", "name", db.Varchar, form.Text).
		FieldMust().
		FieldHelpMsg("Required field")

	// Email - валидация через FieldPattern
	formList.AddField("Email", "email", db.Varchar, form.Text).
		FieldMust().
		FieldHelpMsg("Enter valid email")

	// Password
	formList.AddField("Password", "password", db.Varchar, form.Password).
		FieldHelpMsg("Minimum 6 characters")

	// Verified
	formList.AddField("Verified", "is_verified", db.Bool, form.Switch).
		FieldOptions(types.FieldOptions{
			{Text: "Yes", Value: "1"},
			{Text: "No", Value: "0"},
		})

	formList.SetTable("users").SetTitle("Edit User")

	return t
}
