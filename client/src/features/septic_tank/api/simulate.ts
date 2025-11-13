import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  SimulateSepticTankRequest,
  SimulateSepticTankResponse,
} from "@/features/septic_tank/api/interface";

export const septicTankApi = createApi({
  reducerPath: "septicTankApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + "simulate",
  }),
  endpoints: (build) => ({
    simulateSepticTank: build.mutation<
      SimulateSepticTankResponse,
      SimulateSepticTankRequest<number>
    >({
      query: (data) => ({
        url: "/septic-tank",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSimulateSepticTankMutation } = septicTankApi;
