package routes

import (
	"pond-io-server/internal/mbbr"

	"github.com/gin-gonic/gin"
)

func RegisterSimulationRoutes (r *gin.Engine) {
	mbbrHandler := mbbr.NewHandler()

	simulationGroup := r.Group("/simulate") 
	{
		simulationGroup.POST("/mbbr",mbbrHandler.SimulateMBBR)
		simulationGroup.POST("/ad")
		simulationGroup.POST("/septic-tank")
		simulationGroup.POST("/uasb")
	}
}