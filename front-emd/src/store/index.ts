import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectReducer from "./slices/projectSlice";
import userReducer from "./userSlice";
import workPackageReducer from "./slices/workpackageSlice";
import activiteReducer from "./slices/activiteSlice";
import tacheReducer from "./slices/tacheSlice";
// import tempsReducer from "./";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    users: userReducer,
    workPackages: workPackageReducer,
    activities: activiteReducer,
    taches: tacheReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
