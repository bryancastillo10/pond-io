package routes

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterSimulationModelRoutes (r *gin.Engine, db *mongo.Database) {
	simulationModelGroup := r.Group("/models")
	{
		simulationModelGroup.POST("/")
		simulationModelGroup.GET("/")
		simulationModelGroup.PUT("/:id")
		simulationModelGroup.DELETE("/id")
	}
}