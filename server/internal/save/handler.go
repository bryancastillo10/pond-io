package save

import (
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

func (h *Handler) SaveRecords(c *gin.Context) {
}