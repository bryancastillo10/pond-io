package save

type SaveSimulationRecordRequest struct {
	ID string `json:"id"`
	Title string `json:"title"`
	Model string `json:"model"`
	Input map[string]interface{}	`json:"input"`
	Output map[string]interface{}	`json:"output"`
}

type SaveSimulationRecordResponse struct {
	Message string `json:"message"`
}