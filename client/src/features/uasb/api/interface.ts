interface ParameterInput<T> {
  flowRate: T;
  infCOD: T;
  olr: T;
  upflowVelocity: T;
}

interface EffluentAndGasInput<T> {
  codRemoval: T;
  methaneYield: T;
  methaneFraction: T;
}

interface DimensionsResult<T> {
  volume: T;
  hrt: T;
  crossSectionalArea: T;
  height: T;
  diameter: T;
}

interface GasProductionResult<T> {
  methaneFlow: T;
  biogasFlow: T;
  gasLoading: T;
}

interface ISimulateUASBResult {
  massCODLoad: number;
  massCODRemoved: number;
  dimensions: DimensionsResult<number>;
  estGasProduction: GasProductionResult<number>;
}

export interface SimulateUASBRequest {
  parameters: ParameterInput<number>;
  targetEffluent: EffluentAndGasInput<number>;
}

export interface SimulateUASBResponse {
  message: string;
  result: ISimulateUASBResult;
}
