# NaslyAR-Target - Система ведения и продвижения бизнеса

### Запуск проекта
docker compose up --build

docker-compose down && docker-compose build && docker-compose up -d
### После запуска:

- Frontend (host): http://localhost:3000 (основной микросервис, отвечает залогику отображения основных страниц сервиса)
- Frontend (auth): http://localhost:3001 (микросервис авторизации)
- Admin Panel: http://localhost:4000/admin (админка)
- Backend API: http://localhost:8080 (обработка запросов - бэкенд)
- PostgreSQL: Доступен внутри сети Docker как postgres:5432 (БД)