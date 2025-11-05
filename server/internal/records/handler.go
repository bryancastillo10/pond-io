package records

import (
	"net/http"
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
	return &Handler{ service: service}
}

func (h *Handler) SaveSimulationRecords(c *gin.Context) {
	req, err := http_helper.BindJSON[SaveSimulationRecordRequest](c)
	if err != nil {
		c.Error(err)
		return
	}

	if err := h.service.SaveSimulationRecord(*req); err != nil {
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, SaveSimulationRecordResponse{
		Message: "Simulation result is saved successfully",
	})
}

func (h *Handler) GetSimulationRecords(c *gin.Context) {

	records, err := h.service.GetSimulationRecords() 
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, records)
}


func (h *Handler) UpdateSimulationTitle(c *gin.Context) {
	id := c.Param("id")


	req, err := http_helper.BindJSON[UpdateSimulationTitleRequest](c)
	if err != nil {
		c.Error(err)
		return
	}

	record, err := h.service.UpdateSimulationTitle(id, *req)
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, record)
}

func (h *Handler) DeleteSimulationRecord(c *gin.Context) {
	id := c.Param("id")

	resp, err := h.service.DeleteSimulationRecord(id); 
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, resp)
}