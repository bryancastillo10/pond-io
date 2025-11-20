package simulationmodels

type AddModelRequest struct {
	Title string `json:"title"`
	Description string `json:"description"`
	Category string `json:"category"`
	Link string `json:"link"`
	ExpectedResults []string `json:"expectedResults"`
	Image string `json:"image"`
	ImageAlt string `json:"imageAlt"`
}

type AddModelResponse struct {
	ID string `json:"id"`
   	Title string `json:"title"`
	Category string `json:"category"`
}