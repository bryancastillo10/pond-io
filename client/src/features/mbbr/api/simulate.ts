import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  SimulateMBBRRequest,
  SimulateMbbrResponse,
} from "@/features/mbbr/api/interface";

export const mbbrApi = createApi({
  reducerPath: "mbbrApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_SIMULATE_URL + "simulate",
  }),
  endpoints: (build) => ({
    simulateMbbr: build.mutation<SimulateMbbrResponse, SimulateMBBRRequest>({
      query: (data) => ({
        url: "/mbbr",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSimulateMbbrMutation } = mbbrApi;
