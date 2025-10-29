import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  SimulateUASBRequest,
  SimulateUASBResponse,
} from "@/features/uasb/api/interface";

export const uasbApi = createApi({
  reducerPath: "uasbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "simulate",
  }),
  endpoints: (build) => ({
    simulateUasb: build.mutation<SimulateUASBResponse, SimulateUASBRequest>({
      query: (data) => ({
        url: "/uasb",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSimulateUasbMutation } = uasbApi;
