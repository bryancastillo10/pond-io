package save

import (
	"log"
	"net/http"

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
	var req SaveSimulationRecordRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("Bind error: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.SaveSimulationRecord(req); err != nil {
		log.Printf("Save error: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, SaveSimulationRecordResponse{
		Message: "Simulation result is saved successfully",
	})
}
