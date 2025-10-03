package mbbr

import (
	"math"

	appErr "pond-io-server/pkg/errors"
	"pond-io-server/pkg/mathfmt"
)

type Service struct {
}

func NewService () *Service {
	return &Service{}
}

func (s *Service) SimulateMBBR(req SimulateMbbrRequest) (*SimulateMbbrResponse, error) {
	// --- Input Destructuring ---
	flowRate := req.FlowRate             // m3/d
	infBOD := req.InfBOD                 // mg/L
	infTKN := req.InfTKN                 // mg N/L
	targetPercEffBOD := req.TargetEffPercBOD // %
	targetPercEffTKN := req.TargetEffPercTKN // %

	// Basic Validation
	if flowRate <= 0 {
		return nil, appErr.NewBadRequest("Invalid User ID", nil)
	}

	// --- STAGE 1: BOD Removal ---

	// 1. Calculate BOD effluent concentration (mg/L)
	effBOD_mg_L := (1 - (targetPercEffBOD/100)) * flowRate
	
	// 2. Calculate BOD mass removed (g/d)
	bodMassRemoved_g_d := flowRate * (infBOD - effBOD_mg_L )

	// 3. Design the First Stage Tank
	firstStageResult := calculateStageDesign(bodMassRemoved_g_d, req.FirstStage)
	
	// --- STAGE 2: Ammonia (TKN) Removal ---

	// 1. Calculate TKN effluent concentration (mg/L)
	effTKN_mg_L := (1 - (targetPercEffTKN/100)) * flowRate
	
	// 2. Calculate TKN mass removed (g/d)
	tknMassRemoved_g_d := flowRate * (infTKN - effTKN_mg_L )

	// 3. Design the Second Stage Tank
	secondStageResult := calculateStageDesign(tknMassRemoved_g_d, req.SecondStage)

	// --- Final Response Structure ---
	response := SimulateMbbrResponse{
		EffluentConc: EffluentConc{
			EffluentBOD: effBOD_mg_L,
			EffluentTKN: effTKN_mg_L,
		},
		FirstStage:  firstStageResult,
		SecondStage: secondStageResult,
	}

	return &response, nil
}


func calculateStageDesign(massRemoved_g_d float64, specs MBBRSpecifications) DesignResult {
	// 1. Required Media Surface Area (m2)
	// Area = Mass Removed (g/d) / SALR (g/m2-d)
	mediaSurfaceArea := massRemoved_g_d / specs.SALR

	// 2. Required Media Volume (m3)
	// Media Volume = Area (m2) / Carrier Specific Area (m2/m3)
	mediaVolume := mediaSurfaceArea / specs.CarrierSurfaceArea

	// 3. Required Tank Liquid Volume (m3)
	// Tank Volume = Media Volume (m3) / (Carrier Fill Fraction / 100)
	tankVolume := mediaVolume / (specs.CarrierFill / 100)

	// 4. Tank Dimensions (Width and Length)
	// V = W * L * H, where L = R * W
	// V = W * (R*W) * H = R * W^2 * H
	// W^2 = V / (R * H)
	// W = sqrt( V / (R * H) )
	
	// We use the TankVolume (V), WaterLevel (H), and LengthWidthRatio (R)
	denominator := specs.WaterLevel * specs.LengthWidthRatio
	if denominator == 0 {
		denominator = 1e-9 
	}
	tankWidth := math.Sqrt(tankVolume / denominator)
	tankLength := specs.LengthWidthRatio * tankWidth

	return DesignResult{
		LoadingRate:      mathfmt.RoundToTwoDecimals(massRemoved_g_d),
		MediaSurfaceArea: mathfmt.RoundToTwoDecimals(mediaSurfaceArea),
		MediaVolume:      mathfmt.RoundToTwoDecimals(mediaVolume),
		TankVolume:       mathfmt.RoundToTwoDecimals(tankVolume),
		Width:            mathfmt.RoundToTwoDecimals(tankWidth),
		Length:           mathfmt.RoundToTwoDecimals(tankLength),
	}
}