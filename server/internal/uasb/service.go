package uasb

import (
	"math"

	appErr "pond-io-server/pkg/errors"
	"pond-io-server/pkg/mathfmt"
)

type Service struct {
}

func NewService () *Service {
	return  &Service{}
}

func (s *Service) SimulateUASB(req SimulateUasbRequest) (*SimulateUasbResponse,error) {
	// --- Input Destructuring ---
	parameters := req.ParameterAndOperations
	effluentAndGas := req.EffluentAndGas

	flowRate := parameters.FlowRate             // m3/d
	infCOD := parameters.InfCOD / 1000          // mg/L → kg/m3
	olr := parameters.OrganicLoadingRate        // kg COD/m3-d
	upflowVelocity := parameters.UpflowVelocity * 24 // m/h → m/d

	targetCODRemoval := effluentAndGas.CODRemoval       // %
	methaneYield := effluentAndGas.MethaneYield         // m3 CH4/kg COD
	methaneFraction := effluentAndGas.MethaneFraction   // fraction

	// --- Basic Validation ---
	if flowRate <= 0 {
		return nil, appErr.NewBadRequest("Invalid Flow Rate", nil)
	}

	if targetCODRemoval <= 0 || targetCODRemoval > 100 {
		return nil, appErr.NewBadRequest("COD Removal must be between 1 and 100", nil)
	}
	if effluentAndGas.CODRemoval <=0 || effluentAndGas.CODRemoval > 100 {
		return nil, appErr.NewBadRequest("COD Removal must be values between 1 to 100", nil)
	}

	// --- COD Calculations ---
	massCODLoad := flowRate * infCOD              // kg COD/d
	CODRemoved := (targetCODRemoval * massCODLoad) / 100 // kg COD/d

	// --- Dimension Calculations ---
	volume := massCODLoad / olr                     // m3
	hrt := (volume / flowRate) * 24                 // h
	area := flowRate / upflowVelocity               // m2
	liquidHeight := volume / area                   // m
	diameter := math.Sqrt((4 * area) / math.Pi)     // m

	// --- Gas Estimation ---
	estMethane := CODRemoved * methaneYield         // m3 CH4/d
	estBiogas := estMethane / methaneFraction       // m3/d
	gasLoading := estBiogas / area                  // m3/m2-d

	// --- Construct Response Structs ---
	dimensions := Dimensions{
		Volume:             mathfmt.RoundToTwoDecimals(volume),
		HRT:                int32(mathfmt.RoundToTwoDecimals(hrt)),
		CrossSectionalArea: mathfmt.RoundToTwoDecimals(area),
		Height:             mathfmt.RoundToTwoDecimals(liquidHeight),
		Diameter:           mathfmt.RoundToTwoDecimals(diameter),
	}

	gasProduction := EstimatedGasProduction{
		MethaneFlow: mathfmt.RoundToTwoDecimals(estMethane),
		BiogasFlow:      mathfmt.RoundToTwoDecimals(estBiogas),
		GasLoading:  mathfmt.RoundToTwoDecimals(gasLoading),
	}

	response := SimulateUasbResponse{
		MassCODLoad:            mathfmt.RoundToTwoDecimals(massCODLoad),
		MassCODRemoved:         mathfmt.RoundToTwoDecimals(CODRemoved),
		DimensionsResult:       dimensions,
		EstimatedGasProduction: gasProduction,
	}

	return &response, nil
}