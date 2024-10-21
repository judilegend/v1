import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/tempsSlice";
import projectReducer from "./slices/projectSlice";
import userReducer from "./slices/userSlice";
import workPackageReducer from "./slices/workpackageSlice";
import activiteReducer from "./slices/activiteSlice";
import tacheReducer from "./slices/tacheSlice";
import directMessageReducer from "./slices/directMessageSlice";
import salleReducer from "./slices/salleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    users: userReducer,
    workPackages: workPackageReducer,
    activities: activiteReducer,
    taches: tacheReducer,
    directMessage: directMessageReducer,
    salle: salleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
