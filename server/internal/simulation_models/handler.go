package simulationmodels

import (
	http_helper "pond-io-server/pkg/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

type Handler struct {
	service *Service
}

func NewHandler(db *mongo.Database) *Handler {
	repo := NewRepository(db)
	service := NewService(repo)
	return &Handler{ service:service}
}

func (h *Handler) AddSimulationModel(c *gin.Context) {
	req, err := http_helper.BindJSON[AddModelRequest](c)
	if err != nil {
		c.Error(err)
		return
	}

	response, err := h.service.AddSimulationModel(*req)

	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(200, gin.H{"message":"The simulation model added successfully","result":response})
}

func (h *Handler) GetSimulationModels(c *gin.Context) {

	models, err := h.service.GetSimulationModels()
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(200, models)
}

func (h *Handler) UpdateSimulationModel(c *gin.Context) {
	id := c.Param("id")

	req, err := http_helper.BindJSON[SimulationModels](c)
	if err != nil {
		c.Error(err)
		return
	}

	model, err := h.service.UpdateSimulationModel(id, *req)
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(200, model)
}


func (h *Handler) DeleteSimulationModel(c *gin.Context) {

}