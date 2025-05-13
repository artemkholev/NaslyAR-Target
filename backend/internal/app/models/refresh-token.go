package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type RefreshToken struct {
	ID        uuid.UUID `gorm:"primaryKey" json:"id"`
	Token     string    `gorm:"primaryKey" json:"token"`    // Refresh token value
	UserID    uuid.UUID `gorm:"not null" json:"user_id"`    // Associated user ID
	ExpiresAt time.Time `gorm:"not null" json:"expires_at"` // Expiration time
}

// BeforeCreate is a GORM hook that generates a UUID for the refresh token before creation.
func (u *RefreshToken) BeforeCreate(tx *gorm.DB) error {
	u.ID = uuid.New()
	return nil
}
