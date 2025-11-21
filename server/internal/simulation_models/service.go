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

func (s *Service) UpdateSimulationModel(id string, req SimulationModels) (UpdateSimulationModelResponse, error) {
 	if req.Title == "" && req.Description == "" && req.Category == "" && req.Link == "" &&
        len(req.ExpectedResults) == 0 && req.Image == "" && req.ImageAlt == "" {
        return UpdateSimulationModelResponse{}, appErr.NewBadRequest("No fields provided to update", nil)
    }

	updated, err := s.repo.UpdateSimulationModel(context.Background(), id, req)
	if err != nil {
		return UpdateSimulationModelResponse{}, err
	}	
	
	return UpdateSimulationModelResponse{
		Message: "Simulation model was updated successfully",
		UpdatedModel: updated,	
	}, nil
}

func (s *Service) DeleteSimulationModel(id string) (DeleteSimulationModelResponse, error) {
	if id == "" {
		return DeleteSimulationModelResponse{}, appErr.NewBadRequest("ID is required", nil)
	}

	if err := s.repo.DeleteSimulationModel(context.Background(),id); err != nil {
		return DeleteSimulationModelResponse{}, err
	}

	return DeleteSimulationModelResponse{
		Message: "Simulation model has been deleted",
	},nil
}