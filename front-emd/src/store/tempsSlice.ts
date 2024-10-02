import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Temps } from "../types/type";
import * as tempsService from "../services/tempsService";

export const fetchTemps = createAsyncThunk(
  "temps/fetchTemps",
  async (tacheId: number) => {
    return await tempsService.fetchTemps(tacheId);
  }
);

export const addTemps = createAsyncThunk(
  "temps/addTemps",
  async (temps: Omit<Temps, "id">) => {
    return await tempsService.createTemps(temps);
  }
);

export const updateTemps = createAsyncThunk(
  "temps/updateTemps",
  async ({ id, temps }: { id: number; temps: Partial<Temps> }) => {
    return await tempsService.updateTemps(id, temps);
  }
);

export const removeTemps = createAsyncThunk(
  "temps/removeTemps",
  async (id: number) => {
    await tempsService.deleteTemps(id);
    return id;
  }
);

const tempsSlice = createSlice({
  name: "temps",
  initialState: {
    temps: [] as Temps[],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemps.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTemps.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.temps = action.payload;
      })
      .addCase(fetchTemps.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(addTemps.fulfilled, (state, action) => {
        state.temps.push(action.payload);
      })
      .addCase(updateTemps.fulfilled, (state, action) => {
        const index = state.temps.findIndex(
          (temps) => temps.id === action.payload.id
        );
        if (index !== -1) {
          state.temps[index] = action.payload;
        }
      })
      .addCase(removeTemps.fulfilled, (state, action) => {
        state.temps = state.temps.filter(
          (temps) => temps.id !== action.payload
        );
      });
  },
});

export default tempsSlice.reducer;
