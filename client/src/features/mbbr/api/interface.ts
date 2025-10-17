interface MBBRStageInput<T> {
  salr: T;
  carrierFill: T;
  waterLevel: T;
  carrierSurfaceArea: T;
  lengthWidthRatio: T;
}

interface MBBRStageOutput<T> {
  loadingRate: T;
  mediaSurfaceArea: T;
  mediaVolume: T;
  tankVolume: T;
  width: T;
  length: T;
}

interface EffluentData {
  effluentBOD: number;
  effluentTKN: number;
}

interface ISimulateMBBRResult {
  effluentConc: EffluentData;
  bodRemovalTank: MBBRStageOutput<number>;
  nitrificationTank: MBBRStageOutput<number>;
}

export interface SimulateMBBRRequest {
  flowRate: number;
  infBOD: number;
  infTKN: number;
  targetEffPercBOD: number;
  targetEffPercTKN: number;
  firstStage: MBBRStageInput<number>;
  secondStage: MBBRStageInput<number>;
}

export interface SimulateMbbrResponse {
  message: string;
  result: ISimulateMBBRResult;
}
