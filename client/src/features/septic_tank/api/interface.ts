interface SludgeVolumeSpecifications<T> {
  desludgingPeriod: T;
  sizingFactor: T;
  accumulationRate: T;
}

interface CalculatedInformation<T> {
  flowRate: T;
  retentionTime: T;
  septicTankVolume: T;
  sludgeVolume: T;
}

interface DesignResult<T> {
  totalSepticTankVolume: T;
  tankWidth: T;
  firstTankLength: T;
  secondTankLength: T;
  tankDepth: T;
}

export interface SimulateSepticTankRequest<T> {
  numberOfUsers: T;
  waterConsumption: T;
  waterDepth: T;
  allowanceDepth: T;
  sludgeVolume: SludgeVolumeSpecifications<T>;
}

export interface SimulateSepticTankResponse {
  calculatedInfo: CalculatedInformation<number>;
  dimensions: DesignResult<number>;
}
