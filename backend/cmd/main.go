package main

import (
	"log"
	"os"

	_ "github.com/GoAdminGroup/go-admin/adapter/gin"
	_ "github.com/GoAdminGroup/go-admin/modules/db/drivers/postgres"
	_ "github.com/GoAdminGroup/themes/adminlte"

	"github.com/GoAdminGroup/go-admin/context"
	"github.com/GoAdminGroup/go-admin/engine"
	"github.com/GoAdminGroup/go-admin/modules/config"
	"github.com/GoAdminGroup/go-admin/modules/db"
	"github.com/GoAdminGroup/go-admin/modules/language"
	"github.com/GoAdminGroup/go-admin/plugins/admin"
	"github.com/GoAdminGroup/go-admin/plugins/admin/modules/table"
	"github.com/GoAdminGroup/go-admin/template"
	"github.com/GoAdminGroup/go-admin/template/chartjs"
	"github.com/GoAdminGroup/go-admin/template/types/form"

	"backend/configs"
	"backend/internal/admin/initAdminDB"
	"backend/internal/admin/pages"
	"backend/internal/app/models"
	"backend/internal/app/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Инициализация Gin
	r := gin.Default()

	// Подключение к базе данных
	configs.ConnectDB()
	runAppMigrations()
	initAdminDB.InitAdminTables()

	// Добавление компонентов
	template.AddComp(chartjs.NewChart())

	// Настройка статических файлов ДО инициализации GoAdmin
	r.Static("/assets", "./public/assets")
	r.Static("/uploads", "./uploads")

	// Инициализация движка GoAdmin
	eng := engine.Default()

	// Конфигурация GoAdmin
	cfg := &config.Config{
		Databases: config.DatabaseList{
			"default": {
				Host:         os.Getenv("DB_HOST"),
				Port:         os.Getenv("DB_PORT"),
				User:         os.Getenv("DB_USER"),
				Pwd:          os.Getenv("DB_PASSWORD"),
				Name:         os.Getenv("DB_NAME"),
				MaxIdleConns: 50,
				MaxOpenConns: 150,
				Driver:       db.DriverPostgresql,
				Params: map[string]string{
					"sslmode":  "disable",
					"timezone": "UTC",
				},
			},
		},
		UrlPrefix: "admin",
		IndexUrl:  "/",
		Debug:     true,
		Language:  language.EN,
		Theme:     "adminlte",
		Store: config.Store{
			Path:   "./uploads",
			Prefix: "uploads",
		},
		Title: "Admin Panel",
	}

	// Инициализация админ-плагина с таблицами
	adminPlugin := admin.NewAdmin(
		table.GeneratorList{
			"users": GetUserTable,
		},
	)

	// Подключение плагина к движку
	if err := eng.AddConfig(cfg).
		AddPlugins(adminPlugin).
		Use(r); err != nil {
		log.Fatal("Failed to initialize admin panel: ", err)
	}

	eng.HTML("GET", "/admin", pages.DashboardPage)

	// Middleware
	configureMiddleware(r)

	// Основные роуты приложения
	routes.SetupRoutes(r)

	// Запуск сервера
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on :%s", port)
	log.Fatal(r.Run(":" + port))
}

func runAppMigrations() {
	err := configs.DB.AutoMigrate(
		&models.User{},
		&models.Request{},
		&models.RefreshToken{},
		&models.VerificationToken{},
	)
	if err != nil {
		log.Fatal("App migrations failed:", err)
	}
	log.Println("App migrations completed")
}

func configureMiddleware(r *gin.Engine) {
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * 60 * 60,
	}))
}

func GetUserTable(ctx *context.Context) (t table.Table) {
	t = table.NewDefaultTable(ctx)

	info := t.GetInfo()
	info.AddField("ID", "id", db.UUID).FieldSortable()
	info.AddField("Email", "email", db.Varchar).FieldFilterable()
	info.AddField("First Name", "first_name", db.Varchar)
	info.AddField("Last Name", "last_name", db.Varchar)
	info.AddField("Role", "role", db.Varchar)
	info.AddField("Phone", "phone", db.Varchar)
	info.AddField("Verified", "is_verified", db.Boolean)
	info.AddField("Created At", "created_at", db.Timestamp)
	info.SetTable("users").SetTitle("Users").SetDescription("User Management")

	formList := t.GetForm()
	formList.AddField("ID", "id", db.UUID, form.Default).FieldNotAllowAdd()
	formList.AddField("Email", "email", db.Varchar, form.Text).FieldMust()
	formList.AddField("Password", "password", db.Varchar, form.Password)
	formList.AddField("First Name", "first_name", db.Varchar, form.Text)
	formList.AddField("Last Name", "last_name", db.Varchar, form.Text)
	formList.AddField("Phone", "phone", db.Varchar, form.Text)
	formList.AddField("Verified", "is_verified", db.Boolean, form.Switch)

	return
}
