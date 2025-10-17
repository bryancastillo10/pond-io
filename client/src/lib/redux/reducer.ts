import { combineReducers } from "@reduxjs/toolkit";

// UI States
import themeReducer from "@/lib/redux/slice/themeSlice";
import drawerReducer from "@/lib/redux/slice/drawerSlice";

// API from RTK-Query
import { mbbrApi } from "@/features/mbbr/api/simulate";

const rootReducer = combineReducers({
  theme: themeReducer,
  drawer: drawerReducer,
  [mbbrApi.reducerPath]: mbbrApi.reducer,
});

export const apis = [mbbrApi];

export const apiReducerPaths = apis.map((api) => api.reducerPath);

export default rootReducer;
