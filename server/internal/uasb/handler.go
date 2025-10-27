package uasb

import (
	http_helper "pond-io-server/pkg/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler() *Handler {
	service := NewService()
	return &Handler{ service: service}
}

func (h *Handler) SimulateUASB(c *gin.Context) {
	req, err := http_helper.BindJSON[SimulateUasbRequest](c)
	if err != nil {
		c.Error(err)
		return
	}

	response, err := h.service.SimulateUASB(*req)

	
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(200, gin.H{"message":"Simulation is successful", "result": response})
}