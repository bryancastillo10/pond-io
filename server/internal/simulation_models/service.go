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
	raw, err := s.repo.GetSimulationModels(context.Background())

	if err != nil {
        return GetSimulationModels{}, err
    }

	if raw == nil {
        return GetSimulationModels{Models: []SimulationModels{}}, nil
    }

    var combined []SimulationModels
    for _, item := range *raw {
        if len(item.Models) > 0 {
            combined = append(combined, item.Models...)
        }
    }

    return GetSimulationModels{Models: combined}, nil
}