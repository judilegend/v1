import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as workPackageService from "../../services/workpackageService";
import { WorkPackage } from "../../types/types";

export const fetchWorkPackages = createAsyncThunk(
  "workPackages/fetchWorkPackages",
  async (projectId: number) => {
    const response = await workPackageService.getWorkPackages(projectId);
    return response.data;
  }
);

export const addWorkPackage = createAsyncThunk(
  "workPackages/addWorkPackage",
  async (workPackage: Omit<WorkPackage, "id">) => {
    const response = await workPackageService.createWorkPackage(workPackage);
    return response.data;
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
    const response = await workPackageService.updateWorkPackage(
      id,
      workPackage
    );
    return response.data;
  }
);
export const removeWorkPackage = createAsyncThunk(
  "workPackages/removeWorkPackage",
  async (id: number) => {
    await workPackageService.deleteWorkPackage(id);
    return id;
  }
);
const workPackageSlice = createSlice({
  name: "workPackages",
  initialState: {
    workPackages: [] as WorkPackage[],
    status: "idle",
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
      .addCase(removeWorkPackage.fulfilled, (state, action) => {
        state.workPackages = state.workPackages.filter(
          (wp) => wp.id !== action.payload
        );
      })
      .addCase(updateWorkPackage.fulfilled, (state, action) => {
        const index = state.workPackages.findIndex(
          (wp) => wp.id === action.payload.id
        );
        if (index !== -1) {
          state.workPackages[index] = action.payload;
        }
      });
  },
});

export default workPackageSlice.reducer;
