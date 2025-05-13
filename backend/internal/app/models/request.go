package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Request struct {
	ID          uuid.UUID `gorm:"primaryKey" json:"id"`
	UserID      uuid.UUID `json:"user_id"`
	Phone       string    `gorm:"not null" json:"phone"`         // Номер телефона пользователя
	Niche       string    `gorm:"not null" json:"niche"`         // Ниша рекламы (например, "Недвижимость", "Авто")
	Title       string    `gorm:"not null" json:"title"`         // Название запроса
	Description string    `json:"description"`                   // Дополнительное описание
	Status      string    `gorm:"default:pending" json:"status"` // Статус: "pending", "approved", "rejected"
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

// BeforeCreate is a GORM hook that generates a UUID for the request before creation.
func (r *Request) BeforeCreate(tx *gorm.DB) error {
	r.ID = uuid.New()
	return nil
}
