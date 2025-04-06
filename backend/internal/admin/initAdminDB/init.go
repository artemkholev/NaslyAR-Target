package initAdminDB

import (
	"backend/configs"
	"log"

	"gorm.io/gorm"
)

// Проверка существования системной таблицы GoAdmin
func isGoAdminInitialized(db *gorm.DB) bool {
	return db.Migrator().HasTable("goadmin_users")
}

// Выполнение SQL-дампа
func InitAdminTables() {
	db := configs.DB

	if isGoAdminInitialized(db) {
		log.Println("GoAdmin: системные таблицы уже существуют. Пропускаем миграцию.")
		return
	}

	log.Println("GoAdmin: инициализация системных таблиц из файла dumb/admin.pgsql...")

	queries := []string{
		"CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;",
		"CREATE SEQUENCE IF NOT EXISTS public.goadmin_menu_myid_seq START WITH 1 INCREMENT BY 1 NO MINVALUE MAXVALUE 99999999 CACHE 1;",
		"CREATE TABLE IF NOT EXISTS public.goadmin_menu (id integer DEFAULT nextval('public.goadmin_menu_myid_seq'::regclass) NOT NULL, parent_id integer DEFAULT 0 NOT NULL, type integer DEFAULT 0, \"order\" integer DEFAULT 0 NOT NULL, title character varying(50) NOT NULL, header character varying(100), plugin_name character varying(100) NOT NULL, icon character varying(50) NOT NULL, uri character varying(3000) NOT NULL, uuid character varying(100), created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"CREATE SEQUENCE IF NOT EXISTS public.goadmin_operation_log_myid_seq START WITH 1 INCREMENT BY 1 NO MINVALUE MAXVALUE 99999999 CACHE 1;",
		"CREATE TABLE IF NOT EXISTS public.goadmin_operation_log (id integer DEFAULT nextval('public.goadmin_operation_log_myid_seq'::regclass) NOT NULL, user_id integer NOT NULL, path character varying(255) NOT NULL, method character varying(10) NOT NULL, ip character varying(15) NOT NULL, input text NOT NULL, created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"CREATE SEQUENCE IF NOT EXISTS public.goadmin_site_myid_seq START WITH 1 INCREMENT BY 1 NO MINVALUE MAXVALUE 99999999 CACHE 1;",
		"CREATE TABLE IF NOT EXISTS public.goadmin_site (id integer DEFAULT nextval('public.goadmin_site_myid_seq'::regclass) NOT NULL, key character varying(100) NOT NULL, value text NOT NULL, type integer DEFAULT 0, description character varying(3000), state integer DEFAULT 0, created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"CREATE SEQUENCE IF NOT EXISTS public.goadmin_permissions_myid_seq START WITH 1 INCREMENT BY 1 NO MINVALUE MAXVALUE 99999999 CACHE 1;",
		"CREATE TABLE IF NOT EXISTS public.goadmin_permissions (id integer DEFAULT nextval('public.goadmin_permissions_myid_seq'::regclass) NOT NULL, name character varying(50) NOT NULL, slug character varying(50) NOT NULL, http_method character varying(255), http_path text NOT NULL, created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"CREATE TABLE IF NOT EXISTS public.goadmin_role_menu (role_id integer NOT NULL, menu_id integer NOT NULL, created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"CREATE TABLE IF NOT EXISTS public.goadmin_role_permissions (role_id integer NOT NULL, permission_id integer NOT NULL, created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"CREATE TABLE IF NOT EXISTS public.goadmin_role_users (role_id integer NOT NULL, user_id integer NOT NULL, created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"CREATE SEQUENCE IF NOT EXISTS public.goadmin_roles_myid_seq START WITH 1 INCREMENT BY 1 NO MINVALUE MAXVALUE 99999999 CACHE 1;",
		"CREATE TABLE IF NOT EXISTS public.goadmin_roles (id integer DEFAULT nextval('public.goadmin_roles_myid_seq'::regclass) NOT NULL, name character varying NOT NULL, slug character varying NOT NULL, created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"CREATE SEQUENCE IF NOT EXISTS public.goadmin_session_myid_seq START WITH 1 INCREMENT BY 1 NO MINVALUE MAXVALUE 99999999 CACHE 1;",
		"CREATE TABLE IF NOT EXISTS public.goadmin_session (id integer DEFAULT nextval('public.goadmin_session_myid_seq'::regclass) NOT NULL, sid character varying(50) NOT NULL, \"values\" character varying(3000) NOT NULL, created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"CREATE TABLE IF NOT EXISTS public.goadmin_user_permissions (user_id integer NOT NULL, permission_id integer NOT NULL, created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"CREATE SEQUENCE IF NOT EXISTS public.goadmin_users_myid_seq START WITH 1 INCREMENT BY 1 NO MINVALUE MAXVALUE 99999999 CACHE 1;",
		"CREATE TABLE IF NOT EXISTS public.goadmin_users (id integer DEFAULT nextval('public.goadmin_users_myid_seq'::regclass) NOT NULL, username character varying(100) NOT NULL, password character varying(100) NOT NULL, name character varying(100) NOT NULL, avatar character varying(255), remember_token character varying(100), created_at timestamp without time zone DEFAULT now(), updated_at timestamp without time zone DEFAULT now());",
		"INSERT INTO public.goadmin_users (username, password, name, avatar, remember_token, created_at, updated_at) VALUES ('admin', '$2a$10$OxWYJJGTP2gi00l2x06QuOWqw5VR47MQCJ0vNKnbMYfrutij10Hwe', 'Admin', NULL, 'tlNcBVK9AvfYH7WEnwB1RKvocJu8FfRy4um3DJtwdHuJy0dwFsLOgAc0xUfh', '2019-09-10 00:00:00', '2019-09-10 00:00:00');",
		"ALTER TABLE ONLY public.goadmin_menu ADD CONSTRAINT goadmin_menu_pkey PRIMARY KEY (id);",
		"ALTER TABLE ONLY public.goadmin_operation_log ADD CONSTRAINT goadmin_operation_log_pkey PRIMARY KEY (id);",
		"ALTER TABLE ONLY public.goadmin_permissions ADD CONSTRAINT goadmin_permissions_pkey PRIMARY KEY (id);",
		"ALTER TABLE ONLY public.goadmin_roles ADD CONSTRAINT goadmin_roles_pkey PRIMARY KEY (id);",
		"ALTER TABLE ONLY public.goadmin_site ADD CONSTRAINT goadmin_site_pkey PRIMARY KEY (id);",
		"ALTER TABLE ONLY public.goadmin_session ADD CONSTRAINT goadmin_session_pkey PRIMARY KEY (id);",
		"ALTER TABLE ONLY public.goadmin_users ADD CONSTRAINT goadmin_users_pkey PRIMARY KEY (id);",
	}

	for _, query := range queries {
		if err := db.Exec(query).Error; err != nil {
			log.Fatalf("Ошибка при выполнении SQL-запроса:\n%s\nОшибка: %v", query, err)
		}
	}

	log.Println("GoAdmin: все таблицы успешно созданы.")
}
