package routes

import (
	"pond-io-server/internal/mbbr"
	septictank "pond-io-server/internal/septic_tank"

	"github.com/gin-gonic/gin"
)

func RegisterSimulationRoutes (r *gin.Engine) {
	mbbrHandler := mbbr.NewHandler()
	septicTankHandler := septictank.NewHandler()

	simulationGroup := r.Group("/simulate") 
	{
		simulationGroup.POST("/mbbr",mbbrHandler.SimulateMBBR)
		simulationGroup.POST("/ad")
		simulationGroup.POST("/septic-tank", septicTankHandler.SimulateSepticTank)
		simulationGroup.POST("/uasb")
	}
}