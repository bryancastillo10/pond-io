import { combineReducers } from "@reduxjs/toolkit";

// UI States
import themeReducer from "@/lib/redux/slice/themeSlice";
import drawerReducer from "@/lib/redux/slice/drawerSlice";

// API from RTK-Query
import { mbbrApi } from "@/features/mbbr/api/simulate";
import { uasbApi } from "@/features/uasb/api/simulate";
import { septicTankApi } from "@/features/septic_tank/api/simulate";

import { recordsApi } from "@/features/records/api/recordsApi";

const rootReducer = combineReducers({
  theme: themeReducer,
  drawer: drawerReducer,
  [mbbrApi.reducerPath]: mbbrApi.reducer,
  [uasbApi.reducerPath]: uasbApi.reducer,
  [septicTankApi.reducerPath]: septicTankApi.reducer,
  [recordsApi.reducerPath]: recordsApi.reducer,
});

export const apis = [mbbrApi, uasbApi, septicTankApi, recordsApi];

export const apiReducerPaths = apis.map((api) => api.reducerPath);

export default rootReducer;
