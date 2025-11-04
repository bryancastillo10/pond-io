package records

import "go.mongodb.org/mongo-driver/bson/primitive"

type SaveSimulationRecordRequest struct {
	ID primitive.ObjectID `json:"id"`
	Title string `json:"title"`
	Model string `json:"model"`
	Input map[string]interface{}	`json:"input"`
	Output map[string]interface{}	`json:"output"`
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

type UpdateSimulationTitleResponese struct {
	Message string `json:"message"`
	Title string `json:"title"`
}

type DeleteSimulationRecordResponse struct {
	Message string `json:"message"`
}