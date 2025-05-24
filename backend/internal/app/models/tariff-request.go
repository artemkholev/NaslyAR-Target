package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TariffRequest struct {
	ID          uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	UserID      *uuid.UUID     `gorm:"type:uuid" json:"user_id,omitempty"` // Опционально, если есть авторизация
	TariffTitle string         `gorm:"not null" json:"tariff_title"`       // Название выбранного тарифа
	Phone       string         `gorm:"not null" json:"phone"`              // Телефон пользователя
	Message     string         `json:"message,omitempty"`                  // Доп. сообщение или комментарий
	Status      string         `gorm:"default:'pending'" json:"status"`    // pending, approved, rejected
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

// BeforeCreate создает UUID перед вставкой в базу
func (tr *TariffRequest) BeforeCreate(tx *gorm.DB) (err error) {
	tr.ID = uuid.New()
	return
}
