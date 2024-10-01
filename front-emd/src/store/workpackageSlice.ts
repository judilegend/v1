import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WorkPackage } from "../types/type";

interface WorkPackageState {
  workPackages: WorkPackage[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WorkPackageState = {
  workPackages: [],
  status: "idle",
  error: null,
};

export const fetchWorkPackages = createAsyncThunk(
  "workPackages/fetchWorkPackages",
  async (projectId: number) => {
    const response = await axios.get(`/api/workpackages/project/${projectId}`);
    return response.data;
  }
);

export const addWorkPackage = createAsyncThunk(
  "workPackages/addWorkPackage",
  async (workPackage: Omit<WorkPackage, "id">) => {
    const response = await axios.post("/api/workpackages", workPackage);
    return response.data;
  }
);

export const updateWorkPackage = createAsyncThunk(
  "workPackages/updateWorkPackage",
  async (workPackage: WorkPackage) => {
    const response = await axios.put(
      `/api/workpackages/${workPackage.id}`,
      workPackage
    );
    return response.data;
  }
);

export const deleteWorkPackage = createAsyncThunk(
  "workPackages/deleteWorkPackage",
  async (id: number) => {
    await axios.delete(`/api/workpackages/${id}`);
    return id;
  }
);

const workPackageSlice = createSlice({
  name: "workPackages",
  initialState,
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
      .addCase(deleteWorkPackage.fulfilled, (state, action) => {
        state.workPackages = state.workPackages.filter(
          (wp) => wp.id !== action.payload
        );
      });
  },
});

export default workPackageSlice.reducer;
