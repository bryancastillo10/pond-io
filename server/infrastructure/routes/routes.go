package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(r *gin.Engine) {
	r.GET("/", func (c *gin.Context) {
		c.JSON(200, gin.H{ "message":"🏝️ Pond-io App Server is running"})
	})

	RegisterSimulationRoutes(r)
}