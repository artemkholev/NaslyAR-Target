package main

import (
 "github.com/artemkholev/NaslyAR-Target/backend/initializers"
 "github.com/artemkholev/NaslyAR-Target/backend/models"
)

func init() {
 initializers.LoadEnvVariables()
 initializers.ConnectDB()
}

func main() {
 initializers.DB.AutoMigrate(&models.User{})
}