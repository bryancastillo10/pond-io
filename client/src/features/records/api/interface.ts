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

export interface GetSimulationRecordsResponse {
  records: SaveSimulationRecordRequest[];
}

export interface UpdateSimulationTitleRequest {
  title: string;
}

export interface UpdateSimulationTitleResponse
  extends UpdateSimulationTitleRequest {
  message: string;
}

export interface DeleteSimulationRecordResponse {
  message: string;
}
