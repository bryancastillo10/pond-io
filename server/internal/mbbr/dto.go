package mbbr

type SimulateMbbrRequest struct {
	FlowRate float64 `json:"flowRate"`   //m3/d
	InfBOD float64 `json:"infBOD"`    // mg/L
	InfTKN float64 `json:"infTKN"`    // mg N/L
	TargetEffPercBOD float64 `json:"targetEffPercBOD"`  // %
	TargetEffPercTKN float64	`json:"targetEffPercTKN"`  // %
	FirstStage MBBRSpecifications  `json:"firstStage"`
	SecondStage MBBRSpecifications	`json:"secondStage"`
}

type MBBRSpecifications struct  {
	SALR float64 `json:"salr"`  // g/m2-d
	CarrierFill float64 `json:"carrierFill"`  //%
	WaterLevel float64 `json:"waterLevel"`   //m
	CarrierSurfaceArea float64 `json:"carrierSurfaceArea"` //m2/m3
	LengthWidthRatio float64 `json:"lengthWidthRatio"`
}

type SimulateMbbrResponse struct {
	EffluentConc EffluentConc`json:"effluentConc"`
	FirstStage DesignResult	`json:"bodRemovalTank"`
	SecondStage DesignResult	`json:"nitrificationTank"`
}


type DesignResult struct {
	LoadingRate float64 `json:"loadingRate"`  //BOD LoadingRate for first stage & Ammonia Loading rate for second stage in g/d
	MediaSurfaceArea float64 `json:"mediaSurfaceArea"` // m2
	MediaVolume	float64 `json:"mediaVolume"`  // m3
	TankVolume float64 `json:"tankVolume"`  // m3
	Width float64`json:"width"`   // m
	Length float64 `json:"length"` //m
}

type EffluentConc struct {
	EffluentBOD float64 `json:"effluentBOD"`
	EffluentTKN float64 `json:"effluentTKN"`
}