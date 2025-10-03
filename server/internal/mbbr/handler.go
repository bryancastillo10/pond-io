package mbbr

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


func (h *Handler) SimulateMBBR(c *gin.Context) { 
	req, err := http_helper.BindJSON[SimulateMbbrRequest](c)
	if err != nil {
		c.Error(err)
		return
	}

	println(req)

	response, err := h.service.SimulateMBBR(*req)

	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(200, gin.H{"message":"Simulation is successful", "result": response})
}