package routes

import "github.com/gin-gonic/gin"

func RegisterSimulationRoutes (r *gin.Engine) {
	// simulationHandler := simulation.NewHandler()

	simulationGroup := r.Group("/simulate") 
	{
		simulationGroup.POST("/mbbr")
		simulationGroup.POST("/ad")
		simulationGroup.POST("/septic-tank")
		simulationGroup.POST("/uasb")
	}
}