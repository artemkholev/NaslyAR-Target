package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type VerificationToken struct {
	ID        uuid.UUID `gorm:"primaryKey" json:"id"`
	UserID    uuid.UUID `gorm:"type:uuid;not null" json:"user_id"`
	Token     string    `gorm:"unique;not null" json:"token"`
	ExpiresAt time.Time `gorm:"not null" json:"expires_at"`
}

// BeforeCreate is a GORM hook that generates a UUID for the verification token before creation.
func (u *VerificationToken) BeforeCreate(tx *gorm.DB) error {
	u.ID = uuid.New()
	return nil
}
