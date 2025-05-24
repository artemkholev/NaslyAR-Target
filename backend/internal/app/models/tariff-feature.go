package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// TariffFeature — отдельный пункт/фича тарифа
type TariffFeature struct {
	ID        uuid.UUID      `gorm:"type:uuid;primaryKey" json:"id"`
	TariffID  uuid.UUID      `gorm:"type:uuid;not null;index" json:"tariff_id"`
	Content   string         `gorm:"not null" json:"content"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

// BeforeCreate генерируем UUID для TariffFeature
func (f *TariffFeature) BeforeCreate(tx *gorm.DB) (err error) {
	f.ID = uuid.New()
	return
}
