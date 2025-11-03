package save

type SaveSimulationRecordRequest struct {
	ID string `json:"id"`
	Title string `json:"title"`
	Input map[string]interface{}	`json:"input"`
	Output map[string]interface{}	`json:"output"`
}

type SaveSimulationResponse struct {
	Message string `json:"message"`
}