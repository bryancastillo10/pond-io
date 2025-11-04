package routes

import (
	"pond-io-server/internal/records"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterSaveRecords (r *gin.Engine, db *mongo.Database) {
	recordsHandler := records.NewHandler(db)

	r.POST("/records/:model",  recordsHandler.SaveSimulationRecords)
	r.GET("/records", recordsHandler.GetSimulationRecords)
	r.PUT("/records/:id", recordsHandler.UpdateSimulationTitle)
	r.DELETE("/records/:id", recordsHandler.DeleteSimulationRecord)
}