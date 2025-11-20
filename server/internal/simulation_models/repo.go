package simulationmodels

import (
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository struct {
	db *mongo.Database
}

func NewRepository(db *mongo.Database) *Repository {
	return &Repository{db: db}
}

func (r *Repository) AddSimulationModel(ctx context.Context, req AddModelRequest) (*AddModelResponse, error) {
	collection := r.db.Collection("Models")

	doc := map[string]interface{}{
		"title": req.Title,
		"description": req.Description,
		"category": req.Category,
		"link":req.Link,
		"expectedResults":req.ExpectedResults,
		"image": req.Image,
		"imageAlt": req.ImageAlt,
	}


	result ,err := collection.InsertOne(ctx,doc)
	if err != nil {
		return nil, err
	}

	id := result.InsertedID.(primitive.ObjectID).Hex()

	resp := &AddModelResponse{
		ID: id,
		Title: req.Title,
		Category: req.Category,
	}

	return resp, nil
}