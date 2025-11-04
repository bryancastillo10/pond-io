package records

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func (r *Repository) GetSimulationRecords(ctx context.Context) ([]SaveSimulationRecordRequest, error) {
	collection := r.db.Collection("Simulations")

	cur, err := collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	defer cur.Close(ctx)

	var results []SaveSimulationRecordRequest
    for cur.Next(ctx) {
        var item SaveSimulationRecordRequest
        if err := cur.Decode(&item); err != nil {
            var m bson.M
            if derr := cur.Decode(&m); derr == nil {
                if id, ok := m["_id"].(primitive.ObjectID); ok {
                    item.ID = id
                }
                if t, ok := m["title"].(string); ok {
                    item.Title = t
                }
                if mo, ok := m["model"].(string); ok {
                    item.Model = mo
                }
                if in, ok := m["input"].(map[string]interface{}); ok {
                    item.Input = in
                }
                if out, ok := m["output"].(map[string]interface{}); ok {
                    item.Output = out
                }
            } else {
                return nil, err
            }
        }
        results = append(results, item)
    }

    if err := cur.Err(); err != nil {
        return nil, err
    }

    return results, nil
}

func (r *Repository) UpdateSimulationTitle(ctx context.Context) {

}

func (r *Repository) DeleteSimulationRecord(ctx context.Context) {

}