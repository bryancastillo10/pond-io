package records

import "go.mongodb.org/mongo-driver/bson/primitive"

type SaveSimulationRecordRequest struct {
	ID      primitive.ObjectID       `bson:"_id,omitempty" json:"id"`
    Title   string                   `bson:"title" json:"title"`
    Model   string                   `bson:"model" json:"model"`
    Input   map[string]interface{}   `bson:"input" json:"input"`
    Output  map[string]interface{}   `bson:"output" json:"output"`
}

type SaveSimulationRecordResponse struct {
	Message string `json:"message"`
}

type SimulationRecords struct {
	Records []SaveSimulationRecordRequest `json:"records"`
}

type UpdateSimulationTitleRequest struct {
	Title string `json:"title"`
}

type UpdateSimulationTitleResponse struct {
	Message string `json:"message"`
	Title string `json:"title"`
}

type DeleteSimulationRecordResponse struct {
	Message string `json:"message"`
}