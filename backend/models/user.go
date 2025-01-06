package models

import "gorm.io/gorm"

type User struct {
 gorm.Model
 Content string
 Status  bool
}