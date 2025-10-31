export interface BaseSimulationResults {
  id: string;
  input: Record<string, any>;
  output: Record<string, any>;
}

export interface SaveSimulationRecordRequest extends BaseSimulationResults {
  title: string;
  model: string;
}

export interface SaveSimulationRecordResponse {
  message: string;
}
