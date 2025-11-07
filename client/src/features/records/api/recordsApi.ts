import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  DeleteSimulationRecordResponse,
  GetSimulationRecordsResponse,
  SaveSimulationRecordRequest,
  SaveSimulationRecordResponse,
  UpdateSimulationTitleRequest,
  UpdateSimulationTitleResponse,
} from "@/features/records/api/interface";

export const recordsApi = createApi({
  reducerPath: "recordsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "records",
  }),
  endpoints: (build) => ({
    saveSimulation: build.mutation<
      SaveSimulationRecordResponse,
      Omit<SaveSimulationRecordRequest, "id">
    >({
      query: (data) => ({
        url: `/${data.model}`,
        method: "POST",
        body: data,
      }),
    }),

    getSimulation: build.query<GetSimulationRecordsResponse, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),

    updateSimulationTitle: build.mutation<
      UpdateSimulationTitleResponse,
      { id: string; data: UpdateSimulationTitleRequest }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteSimulationRecord: build.mutation<
      DeleteSimulationRecordResponse,
      string
    >({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSaveSimulationMutation,
  useGetSimulationQuery,
  useUpdateSimulationTitleMutation,
  useDeleteSimulationRecordMutation,
} = recordsApi;
