package records

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)


type Repository struct {
	db *mongo.Database
}

func NewRepository (db *mongo.Database) *Repository {
	return &Repository{db: db}
}

func (r *Repository) SaveSimulationRecord (ctx context.Context, req SaveSimulationRecordRequest) error {
	collection := r.db.Collection("Simulations")

	doc := map[string]interface{}{
		"id": req.ID,
		"title":req.Title,
		"model":req.Model,
		"input":req.Input,
		"output":req.Output,
		"createdAt": time.Now(),
	}

	_, err := collection.InsertOne(ctx, doc)
	return err
}