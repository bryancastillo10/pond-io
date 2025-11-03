package routes

import (
	"pond-io-server/internal/save"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterSaveRecords (r *gin.Engine, db *mongo.Database) {
	saveHandler := save.NewHandler(db)

	r.POST("/save/:model",  saveHandler.SaveRecords)
}