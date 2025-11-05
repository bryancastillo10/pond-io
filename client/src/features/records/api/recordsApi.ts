import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  SaveSimulationRecordRequest,
  SaveSimulationRecordResponse,
} from "@/features/records/api/interface";

export const recordsApi = createApi({
  reducerPath: "recordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "records",
  }),
  endpoints: (build) => ({
    saveSimulation: build.mutation<
      SaveSimulationRecordResponse,
      SaveSimulationRecordRequest
    >({
      query: (data) => ({
        url: `/${data.model}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSaveSimulationMutation } = recordsApi;
