# Stage 1: Build the Go app
FROM golang:1.23-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и скачиваем их
COPY go.mod go.sum ./
RUN go mod download

# Копируем весь исходный код в контейнер
COPY . .

# Собираем приложение
RUN go build -o go-crud ./cmd

# Stage 2: Create minimal runtime image
FROM alpine:3.18

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем сертификаты для работы с TLS, если необходимо
RUN apk add --no-cache ca-certificates

# Копируем скомпилированное приложение из build-этапа
COPY --from=builder /app/go-crud .

# Копируем конфигурационные файлы (.env, если нужно)
COPY .env .env

# Открываем порт, на котором приложение будет работать
EXPOSE 8080

# Запускаем приложение
CMD ["./go-crud"]
