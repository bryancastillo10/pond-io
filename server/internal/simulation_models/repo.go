package simulationmodels

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
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

	id := result.InsertedID.(primitive.ObjectID)

	resp := &AddModelResponse{
		ID: id,
		Title: req.Title,
		Category: req.Category,
	}

	return resp, nil
}

func (r* Repository) GetSimulationModels (ctx context.Context) (*[]GetSimulationModels ,error) {
	collection := r.db.Collection("Models")

	cur, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	defer cur.Close(ctx)

	var models []GetSimulationModels

	for cur.Next(ctx) {
		var model GetSimulationModels
		if err := cur.Decode(&model); err != nil {
			return nil,err
		}
		models = append(models, model)
	}

	return &models, nil
}