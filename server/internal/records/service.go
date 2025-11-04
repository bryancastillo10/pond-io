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
