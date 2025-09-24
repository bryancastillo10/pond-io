import { combineReducers } from "@reduxjs/toolkit";

// UI States
import themeReducer from "@/lib/redux/slice/themeSlice";
import drawerReducer from "@/lib/redux/slice/drawerSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  drawer: drawerReducer,
});

export default rootReducer;
