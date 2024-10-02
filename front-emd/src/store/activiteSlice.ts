import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Activite } from "../types/type";
import * as activityService from "../services/activiteService";

export const fetchActivites = createAsyncThunk(
  "activities/fetchActivites",
  async (workPackageId: number) => {
    return await activityService.fetchActivites(workPackageId);
  }
);

export const addActivite = createAsyncThunk(
  "activities/addActivite",
  async (activite: Omit<Activite, "id">) => {
    return await activityService.createActivite(activite);
  }
);

export const updateActivite = createAsyncThunk(
  "activities/updateActivite",
  async ({ id, activite }: { id: number; activite: Partial<Activite> }) => {
    return await activityService.updateActivite(id, activite);
  }
);

export const removeActivite = createAsyncThunk(
  "activities/removeActivite",
  async (id: number) => {
    await activityService.deleteActivite(id);
    return id;
  }
);

const activiteSlice = createSlice({
  name: "activities",
  initialState: {
    activities: [] as Activite[],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActivites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activities = action.payload;
      })
      .addCase(fetchActivites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(addActivite.fulfilled, (state, action) => {
        state.activities.push(action.payload);
      })
      .addCase(updateActivite.fulfilled, (state, action) => {
        const index = state.activities.findIndex(
          (activite) => activite.id === action.payload.id
        );
        if (index !== -1) {
          state.activities[index] = action.payload;
        }
      })
      .addCase(removeActivite.fulfilled, (state, action) => {
        state.activities = state.activities.filter(
          (activite) => activite.id !== action.payload
        );
      });
  },
});

export default activiteSlice.reducer;
