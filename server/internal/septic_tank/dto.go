package septictank

type SimulateSepticTankRequest struct {
	NumberOfUsers int64 `json:"numberOfUsers"` //persons
	WaterConsumption int64 `json:"waterConsumption"` // L
	WaterDepth	float64 `json:"waterDepth"` //m
	AllowanceDepth float64 `json:"allowanceDepth"` //m
	SludgeVolume SludgeVolumeSpecifications	`json:"sludgeVolume"`
}

type SludgeVolumeSpecifications struct {
	DesludgingPeriod int64 `json:"desludgingPeriod"` //years
	SizingFactor	float64	`json:"sizingFactor"` //factor based on table
	AccumulationRate int64 `json:"accumulationRate"` // L/person
}

type SimulateSepticTankResponse struct {
	CalculatedInfo CalculatedInformation
	Dimensions DesignResult `json:"dimensions"`
}

type CalculatedInformation struct {
	FlowRate float64 `json:"flowRate"` // m3/d
	RetentionTime float64 `json:"retentionTime"` // h
	SepticTankVolume float64 `json:"septicTankVolume"`  //m3
	SludgeVolume	float64 `json:"sludgeVolume"`  //m3
}

type DesignResult struct {
	TotalSepticTankVolume float64 `json:"totalSepticTankVolume"`
	TankWidth	float64	`json:"tankWidth"` //m
	FirstTankLength float64 `json:"firstTankLength"` //m
	SecondTankLength float64 `json:"secondTankLength"` //m
	TankDepth float64	`json:"tankDepth"`  //m
}