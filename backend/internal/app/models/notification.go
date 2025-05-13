package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Notification struct {
	ID        uuid.UUID      `gorm:"primaryKey" json:"id"`
	Title     string         `gorm:"not null" json:"title"`
	Message   string         `gorm:"not null" json:"message"`
	Status    string         `json:"status"`
	IsRead    bool           `gorm:"default:false" json:"is_read"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}

func (n *Notification) BeforeCreate(tx *gorm.DB) error {
	n.ID = uuid.New()
	return nil
}
