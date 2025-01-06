package models

import "gorm.io/gorm"

type Request struct {
	gorm.Model
	ID          uint   `gorm:"primaryKey" json:"id"`
	UserID      uint   `json:"user_id"`
	Title       string `gorm:"not null" json:"title"`
	Description string `json:"description"`
	Status      string `gorm:"default:pending" json:"status"` // e.g., "pending", "approved", "rejected"
}