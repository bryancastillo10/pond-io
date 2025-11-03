package routes

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterSaveRecords (r *gin.Engine, db *mongo.Database) {
	r.POST("/save/:model", )
}