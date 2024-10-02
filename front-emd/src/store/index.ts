import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectReducer from "./projectSlice";
import userReducer from "./userSlice";
import workPackageReducer from "./workpackageSlice";
import activiteReducer from "./activiteSlice";
import tacheReducer from "./tacheSlice";
import tempsReducer from "./tempsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    users: userReducer,
    workPackages: workPackageReducer,
    activities: activiteReducer,
    taches: tacheReducer,
    temps: tempsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
