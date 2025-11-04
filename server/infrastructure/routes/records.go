package routes

import (
	"pond-io-server/internal/records"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterSaveRecords (r *gin.Engine, db *mongo.Database) {
	saveHandler := records.NewHandler(db)

	r.POST("/save/:model",  saveHandler.SaveSimulationRecords)
}