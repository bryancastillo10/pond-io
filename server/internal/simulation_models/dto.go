package simulationmodels

import "go.mongodb.org/mongo-driver/bson/primitive"

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
	ID  primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
   	Title string `json:"title"`
	Category string `json:"category"`
}

type SimulationModels struct {
	ID primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	Title string `json:"title"`
	Description string `json:"description"`
	Category string `json:"category"`
	Link string `json:"link"`
	ExpectedResults []string `json:"expectedResults"`
	Image string `json:"image"`
	ImageAlt string `json:"imageAlt"`
}

type GetSimulationModels struct {
	Models []SimulationModels `json:"models"`
}