import { combineReducers } from "@reduxjs/toolkit";

// UI States
import themeReducer from "@/lib/redux/slice/themeSlice";
import drawerReducer from "@/lib/redux/slice/drawerSlice";

// API from RTK-Query
import { mbbrApi } from "@/features/mbbr/api/simulate";
import { uasbApi } from "@/features/uasb/api/simulate";

import { saveApi } from "@/features/save_simulation/api/saveApi";

const rootReducer = combineReducers({
  theme: themeReducer,
  drawer: drawerReducer,
  [mbbrApi.reducerPath]: mbbrApi.reducer,
  [uasbApi.reducerPath]: uasbApi.reducer,
  [saveApi.reducerPath]: saveApi.reducer,
});

export const apis = [mbbrApi, uasbApi, saveApi];

export const apiReducerPaths = apis.map((api) => api.reducerPath);

export default rootReducer;
