package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Request struct {
	ID         uuid.UUID      `gorm:"primaryKey" json:"id"`
	UserID      uint   `json:"user_id"`
	Title       string `gorm:"not null" json:"title"`
	Description string `json:"description"`
	Status      string `gorm:"default:pending" json:"status"` // e.g., "pending", "approved", "rejected"
}

// BeforeCreate is a GORM hook that generates a UUID for the request before creation.
func (u *Request) BeforeCreate(tx *gorm.DB) error {
	u.ID = uuid.New()
	return nil
}
