package records

import (
	"log"
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
		log.Printf("Save error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
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
	// id := c.Params("id")

	c.JSON(http.StatusOK, gin.H{"message":"Update Simulation Title"})
}

func (h *Handler) DeleteSimulationRecord(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message":"DELETE Simulation Records"})
}