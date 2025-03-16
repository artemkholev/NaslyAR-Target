package email

import (
	"fmt"
	"log"
	"os"

	"gopkg.in/gomail.v2"
)

// SendEmail отправляет email с указанными параметрами
func SendEmail(to, subject, body string) error {
	// Создаем письмо
	m := gomail.NewMessage()
	m.SetHeader("From", os.Getenv("SMTP_FROM")) // От кого (ваш email)
	m.SetHeader("To", to)                       // Кому (email пользователя)
	m.SetHeader("Subject", subject)             // Тема письма
	m.SetBody("text/html", body)                // Тело письма

	// Настройки SMTP
	d := gomail.NewDialer(
		"smtp.gmail.com",          // SMTP-хост
		465,                       // Порт
		os.Getenv("EMAIL_LOGIN"),  // Логин (ваш email)
		os.Getenv("APP_PASSWORD"), // Пароль
	)

	// Отправляем письмо
	if err := d.DialAndSend(m); err != nil {
		log.Printf("Ошибка при отправке письма на %s: %v", to, err)
		return fmt.Errorf("ошибка при отправке письма: %w", err)
	}

	log.Printf("Письмо отправлено на %s", to)
	return nil
}
