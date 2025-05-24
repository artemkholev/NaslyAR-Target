package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Tariff — описание тарифа
type Tariff struct {
	ID             uuid.UUID       `gorm:"type:uuid;primaryKey" json:"id"`
	Title          string          `gorm:"not null" json:"title"` // Название тарифа
	Price          float64         `gorm:"not null" json:"price"` // Цена тарифа
	OldPrice       *float64        `json:"old_price,omitempty"`   // Старая цена (если есть)
	Description    string          `json:"description,omitempty"`
	ShowOnMainPage bool            `gorm:"default:false" json:"show_on_main_page"` // Описание тарифа
	Features       []TariffFeature `gorm:"foreignKey:TariffID" json:"features"`    // Список возможностей / пунктов
	CreatedAt      time.Time       `json:"created_at"`
	UpdatedAt      time.Time       `json:"updated_at"`
	DeletedAt      gorm.DeletedAt  `gorm:"index" json:"-"`
}

// BeforeCreate генерируем UUID для Tariff
func (t *Tariff) BeforeCreate(tx *gorm.DB) (err error) {
	t.ID = uuid.New()
	return
}
