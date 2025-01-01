package main

import (
 "github.com/gin-gonic/gin"
 "github.com/artemkholev/NaslyAR-Target/backend/initializers"
 "github.com/artemkholev/NaslyAR-Target/backend/routes"
)

func init() {
 initializers.LoadEnvVariables()
 initializers.ConnectDB()
}

func main() {

 r := gin.Default()

 // Todo Routes
 routes.TodoRoutes(r)

 r.Run()
}