package records

import (
	"context"
	appErr "pond-io-server/pkg/errors"
)

type Service struct {
	repo *Repository	
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) SaveSimulationRecord(req SaveSimulationRecordRequest) error {
	if req.Title == "" || req.Model == "" {
		return appErr.NewBadRequest("Title and Model are required", nil)
	}

	if err := s.repo.SaveSimulationRecord(context.Background(), req); err != nil {
		return err
	}

	return nil
}


func (s *Service) GetSimulationRecords() (SimulationRecords, error) {
    records, err := s.repo.GetSimulationRecords(context.Background())
    if err != nil {
        return SimulationRecords{}, err
    }

    return SimulationRecords{Records: records}, nil
}

func (s *Service) UpdateSimulationTitle(id string, req UpdateSimulationTitleRequest) (UpdateSimulationTitleResponse, error) {
	if req.Title == "" {
		return UpdateSimulationTitleResponse{}, appErr.NewBadRequest("Title is required", nil)
	}

	updated, err := s.repo.UpdateSimulationTitle(context.Background(), id, req.Title)
	if err != nil {
		return UpdateSimulationTitleResponse{}, err
	}

	return UpdateSimulationTitleResponse{
			Message: "Simulation record title is updated",
			Title: updated.Title,	
	}, nil


}

func (s *Service) DeleteSimulationRecord(id string) (DeleteSimulationRecordResponse, error) {
	if id == "" {
		return DeleteSimulationRecordResponse{}, appErr.NewBadRequest("ID is required", nil)
	}

	if err := s.repo.DeleteSimulationRecord(context.Background(), id); err != nil {
		return  DeleteSimulationRecordResponse{}, err
	}	

	return DeleteSimulationRecordResponse{
		Message: "Simulation record has been deleted",
	}, nil
}