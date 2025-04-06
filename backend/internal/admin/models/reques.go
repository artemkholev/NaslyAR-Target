package models

import (
	"github.com/GoAdminGroup/go-admin/context"
	"github.com/GoAdminGroup/go-admin/modules/db"
	"github.com/GoAdminGroup/go-admin/plugins/admin/modules/table"
	"github.com/GoAdminGroup/go-admin/template/types"
	"github.com/GoAdminGroup/go-admin/template/types/form"
)

// GetRequestTable возвращает таблицу запросов
func GetRequestTable(ctx *context.Context) table.Table {
	t := table.NewDefaultTable(ctx)

	info := t.GetInfo()
	info.AddField("ID", "id", db.Bigint).
		FieldSortable()
	info.AddField("User ID", "user_id", db.Bigint)

	// Исправленный блок для поля Type
	typeField := info.AddField("Type", "type", db.Varchar)
	typeField.FieldFilterable(types.FilterType{FormType: form.Select})
	typeField.FieldFilterOptions(types.FieldOptions{
		{Text: "GET", Value: "GET"},
		{Text: "POST", Value: "POST"},
		{Text: "PUT", Value: "PUT"},
		{Text: "DELETE", Value: "DELETE"},
	})

	info.AddField("Path", "path", db.Varchar)
	info.AddField("Created At", "created_at", db.Timestamp).
		FieldSortable()

	info.SetTable("requests").
		SetTitle("Requests").
		SetDescription("All application requests")

	formList := t.GetForm()
	formList.AddField("ID", "id", db.Bigint, form.Default).
		FieldNotAllowAdd()
	formList.AddField("User ID", "user_id", db.Bigint, form.Number).
		FieldMust()

	// Исправленный блок для поля Type в форме
	formList.AddField("Type", "type", db.Varchar, form.Select).
		FieldOptions(types.FieldOptions{
			{Text: "GET", Value: "GET"},
			{Text: "POST", Value: "POST"},
			{Text: "PUT", Value: "PUT"},
			{Text: "DELETE", Value: "DELETE"},
		})

	formList.AddField("Path", "path", db.Varchar, form.Text).
		FieldMust()
	formList.AddField("Created At", "created_at", db.Timestamp, form.Datetime)

	formList.SetTable("requests").
		SetTitle("Requests").
		SetDescription("Edit request information")

	return t
}
