package septictank

import (
	"math"

	appErr "pond-io-server/pkg/errors"
)

type Service struct {
}

func NewService () *Service {
	return &Service{}
}

func (s *Service) SimulateSepticTank(req SimulateSepticTankRequest) (*SimulateSepticTankResponse, error) {
	// --- Input Destructuring ---
	numUsers := req.NumberOfUsers  //persons
	waterConsumption := req.WaterConsumption // L/person
	waterDepth := req.WaterDepth  //m
	allowanceDepth := req.AllowanceDepth //m
	sludgeVolumeSpecs := req.SludgeVolume


	if waterConsumption <= 0 {
		return nil, appErr.NewBadRequest("Invalid Water Consumption",nil)
	}

	/// --- Calculated Information
	dailyFlowRate := float64(numUsers) * (float64(waterConsumption) / 1000.0)
	retentionTime := estimateRetentionTime(dailyFlowRate)
	estSepticTankVolume := dailyFlowRate * (24.0/retentionTime)
	sludgeVolume := float64(numUsers) *
		float64(sludgeVolumeSpecs.DesludgingPeriod) *
		sludgeVolumeSpecs.SizingFactor *
		(float64(sludgeVolumeSpecs.AccumulationRate) / 1000.0)

	// --- Design Calculation
	totalSepticTankVolume := estSepticTankVolume + sludgeVolume

	baseTankWidth := math.Sqrt(totalSepticTankVolume/4.5)
	tankWidth := math.Ceil(baseTankWidth * 10) / 10

	firstTankLength := 2*tankWidth

	tankDepth := waterDepth + allowanceDepth

	// -- Final Response Structure ---
	response := SimulateSepticTankResponse{
		CalculatedInfo: CalculatedInformation{
			FlowRate: dailyFlowRate,
			RetentionTime: retentionTime,
			SepticTankVolume: estSepticTankVolume,
			SludgeVolume: sludgeVolume,
		},
		Dimensions: DesignResult{
			TotalSepticTankVolume: totalSepticTankVolume,
			TankWidth: tankWidth,
			FirstTankLength:  firstTankLength,
			SecondTankLength: tankWidth,
			TankDepth: tankDepth,
		},	
	}

	return &response,nil
}

func estimateRetentionTime (flowRate float64) float64 {
    switch {
    case flowRate < 6:
        return 24
    case flowRate <= 14:
        return 33 - 1.5*flowRate
    default:
        return 12
    }
}