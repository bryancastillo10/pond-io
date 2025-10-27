package uasb

type SimulateUasbRequest struct {
	ParameterAndOperations ParameterAndOperations `json:"parameters"`
	EffluentAndGas	EffluentAndGas `json:"targetEffluent"`
}

type ParameterAndOperations struct {
	FlowRate float64 `json:"flowRate"`   //m3/d
	InfCOD float64 `json:"infCOD"`    // mg/L
	OrganicLoadingRate float64	`json:"olr"` //kg COD/m3 d
	UpflowVelocity float64 `json:"upflowVelocity"` //m/h
}

type EffluentAndGas struct {
	CODRemoval	float64 `json:"codRemoval"` // %
	MethaneYield  float64	`json:"methaneYield"` // m3 CH4/ kg COD
	MethaneFraction float64	`json:"methaneFraction"` 
}

type SimulateUasbResponse struct {
	MassCODRemoved float64 `json:"massCODRemoved"` //kg/d
	DimensionsResult Dimensions `json:"dimensions"`
	EstimatedGasProduction	EstimatedGasProduction `json:"estGasProduction"`
}

type Dimensions struct {
	MassCODLoad float64 `json:"massCODLoad"` // kg COD
	Volume float64 `json:"volume"` //m3
	HRT int32 `json:"hrt"` // h
	CrossSectionalArea float64 `json:"crossSectionalArea"` // m2
	Height float64 `json:"height"` // m
	Diameter float64 `json:"diameter"` // m
}

type EstimatedGasProduction struct {
	MethaneFlow float64 `json:"methaneFlow"` // m3/d
	Biogas float64	`json:"biogasFlow"` // m3/d
	GasLoading float64 `json:"gasLoading"` // m3/ m2-d
}