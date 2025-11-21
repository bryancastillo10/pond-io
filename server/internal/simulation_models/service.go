package simulationmodels

import (
	"context"
	appErr "pond-io-server/pkg/errors"
)

type Service struct {
	repo *Repository
}

func NewService (repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) AddSimulationModel(req AddModelRequest) (*AddModelResponse, error) {
	if req.Title == "" || req.Link == "" {
		return nil, appErr.NewBadRequest("Title and link are required", nil)
	}

	model, err := s.repo.AddSimulationModel(context.Background(), req); 
	if err != nil {
		return nil, err
	}

	return model, nil
}

func (s *Service) GetSimulationModels() (GetSimulationModels, error) {
	models, err := s.repo.GetSimulationModels(context.Background())

	if err != nil {
        return GetSimulationModels{}, err
    }

	return GetSimulationModels{
		Models: models,
	}, nil
}