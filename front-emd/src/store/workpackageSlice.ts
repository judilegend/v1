import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WorkPackage } from "../types/type";
import * as workpackageService from "../services/workpackageService";

export const fetchWorkPackages = createAsyncThunk(
  "workPackages/fetchWorkPackages",
  async (projectId: number) => {
    return await workpackageService.fetchWorkPackages(projectId);
  }
);

export const addWorkPackage = createAsyncThunk(
  "workPackages/addWorkPackage",
  async (workPackage: Omit<WorkPackage, "id">) => {
    return await workpackageService.createWorkPackage(workPackage);
  }
);

export const updateWorkPackage = createAsyncThunk(
  "workPackages/updateWorkPackage",
  async ({
    id,
    workPackage,
  }: {
    id: number;
    workPackage: Partial<WorkPackage>;
  }) => {
    return await workpackageService.updateWorkPackage(id, workPackage);
  }
);

export const removeWorkPackage = createAsyncThunk(
  "workPackages/removeWorkPackage",
  async (id: number) => {
    await workpackageService.deleteWorkPackage(id);
    return id;
  }
);

const workPackageSlice = createSlice({
  name: "workPackages",
  initialState: {
    workPackages: [] as WorkPackage[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkPackages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkPackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workPackages = action.payload;
      })
      .addCase(fetchWorkPackages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addWorkPackage.fulfilled, (state, action) => {
        state.workPackages.push(action.payload);
      })
      .addCase(updateWorkPackage.fulfilled, (state, action) => {
        const index = state.workPackages.findIndex(
          (wp) => wp.id === action.payload.id
        );
        if (index !== -1) {
          state.workPackages[index] = action.payload;
        }
      })
      .addCase(removeWorkPackage.fulfilled, (state, action) => {
        state.workPackages = state.workPackages.filter(
          (wp) => wp.id !== action.payload
        );
      });
  },
});

export default workPackageSlice.reducer;
