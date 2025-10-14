package septictank

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

func (h *Handler) SimulateSepticTank(c *gin.Context) {
	req, err := http_helper.BindJSON[SimulateSepticTankRequest](c)
	if err != nil {
		c.Error(err)
		return
	}

	response, err := h.service.SimulateSepticTank(*req)
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(200, gin.H{ "message": "Simulation is successful","result": response})
}