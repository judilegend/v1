import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Tache } from "../types/type";
import * as tacheService from "../services/tacheService";

export const fetchTaches = createAsyncThunk(
  "taches/fetchTaches",
  async (activiteId: number) => {
    return await tacheService.fetchTaches(activiteId);
  }
);

export const addTache = createAsyncThunk(
  "taches/addTache",
  async (tache: Omit<Tache, "id">) => {
    return await tacheService.createTache(tache);
  }
);

export const updateTache = createAsyncThunk(
  "taches/updateTache",
  async ({ id, tache }: { id: number; tache: Partial<Tache> }) => {
    return await tacheService.updateTache(id, tache);
  }
);

export const removeTache = createAsyncThunk(
  "taches/removeTache",
  async (id: number) => {
    await tacheService.deleteTache(id);
    return id;
  }
);

const tacheSlice = createSlice({
  name: "taches",
  initialState: {
    taches: [] as Tache[],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTaches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taches = action.payload;
      })
      .addCase(fetchTaches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(addTache.fulfilled, (state, action) => {
        state.taches.push(action.payload);
      })
      .addCase(updateTache.fulfilled, (state, action) => {
        const index = state.taches.findIndex(
          (tache) => tache.id === action.payload.id
        );
        if (index !== -1) {
          state.taches[index] = action.payload;
        }
      })
      .addCase(removeTache.fulfilled, (state, action) => {
        state.taches = state.taches.filter(
          (tache) => tache.id !== action.payload
        );
      });
  },
});

export default tacheSlice.reducer;
