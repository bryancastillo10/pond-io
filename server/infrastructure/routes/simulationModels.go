package routes

import (
	simulationmodels "pond-io-server/internal/simulation_models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterSimulationModelRoutes (r *gin.Engine, db *mongo.Database) {
	modelsHandler := simulationmodels.NewHandler(db)

	simulationModelGroup := r.Group("/models")
	{
		simulationModelGroup.POST("/", modelsHandler.AddSimulationModel)
		simulationModelGroup.GET("/", modelsHandler.GetSimulationModels)
		simulationModelGroup.PUT("/:id")
		simulationModelGroup.DELETE("/id")
	}
}