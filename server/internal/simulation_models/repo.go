package simulationmodels

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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

func (r* Repository) GetSimulationModels (ctx context.Context) ([]SimulationModels,error) {
	collection := r.db.Collection("Models")

	cur, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	defer cur.Close(ctx)

	var models []SimulationModels

	for cur.Next(ctx) {
		var model SimulationModels
		if err := cur.Decode(&model); err != nil {
			return nil,err
		}
		models = append(models, model)
	}

	return models, nil
}

func (r *Repository) UpdateSimulationModel(ctx context.Context, idHex string, req SimulationModels) (SimulationModels, error) {
	collection := r.db.Collection("Models")

	oid, err := primitive.ObjectIDFromHex(idHex)
	if err != nil {
		return SimulationModels{}, err
	}

	  filter := bson.M{"_id": oid}

    updateFields := bson.M{}
    if req.Title != "" {
        updateFields["title"] = req.Title
    }
    if req.Description != "" {
        updateFields["description"] = req.Description
    }
    if req.Category != "" {
        updateFields["category"] = req.Category
    }
    if req.Link != "" {
        updateFields["link"] = req.Link
    }
    if len(req.ExpectedResults) > 0 {
        updateFields["expectedResults"] = req.ExpectedResults
    }
    if req.Image != "" {
        updateFields["image"] = req.Image
    }
    if req.ImageAlt != "" {
        updateFields["imageAlt"] = req.ImageAlt
    }

    if len(updateFields) == 0 {
        return SimulationModels{}, fmt.Errorf("no fields to update")
    }

    updateFields["updatedAt"] = time.Now()

	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

    var updated SimulationModels
    err = collection.FindOneAndUpdate(ctx, filter, bson.M{"$set": updateFields}, opts).Decode(&updated)
    if err != nil {
        return SimulationModels{}, err
    }

    return updated, nil
}

func (r *Repository) DeleteSimulationModel(ctx context.Context, idHex string) error {
	collection := r.db.Collection("Models")

	oid, err := primitive.ObjectIDFromHex(idHex)
	if err != nil {
		return err
	}

	filter := bson.M{"_id":oid}
	res, err := collection.DeleteOne(ctx, filter)
	
	if err != nil{
		return err
	}

	if res.DeletedCount == 0 {
		return fmt.Errorf("No document found with id %s", idHex)
	}

	return nil
}