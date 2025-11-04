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

func (s *Service) UpdateSimulationTitle() {

}

func (s *Service) DeleteSimulationRecord() {

}