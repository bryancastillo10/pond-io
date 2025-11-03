package routes

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterRoutes(r *gin.Engine, db *mongo.Database) {
	r.GET("/", func (c *gin.Context) {
		c.JSON(200, gin.H{ "message":"🏝️ Pond-io App Server is running"})
	})

	RegisterSaveRecords(r, db)
	RegisterSimulationRoutes(r)
}