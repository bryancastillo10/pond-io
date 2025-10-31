import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  SaveSimulationRecordRequest,
  SaveSimulationRecordResponse,
} from "@/features/save_simulation/api/interface";

export const saveApi = createApi({
  reducerPath: "saveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "save",
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

export const { useSaveSimulationMutation } = saveApi;
