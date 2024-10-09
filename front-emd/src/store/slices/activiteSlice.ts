import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as activiteService from "../../services/activiteService";
import { Activite } from "../../types/types";

export const fetchActivites = createAsyncThunk(
  "activites/fetchActivites",
  async (workPackageId: number) => {
    const response = await activiteService.getActivites(workPackageId);
    return response.data;
  }
);

export const addActivite = createAsyncThunk(
  "activites/addActivite",
  async (activite: Omit<Activite, "id">) => {
    const response = await activiteService.createActivite(activite);
    return response.data;
  }
);

export const updateActivite = createAsyncThunk(
  "activites/updateActivite",
  async ({ id, activite }: { id: number; activite: Partial<Activite> }) => {
    const response = await activiteService.updateActivite(id, activite);
    return response.data;
  }
);
export const removeActivite = createAsyncThunk(
  "activites/removeActivite",
  async (id: number) => {
    await activiteService.deleteActivite(id);
    return id;
  }
);
const activiteSlice = createSlice({
  name: "activites",
  initialState: {
    activites: [] as Activite[],
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
        state.activites = action.payload;
      })
      .addCase(fetchActivites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addActivite.fulfilled, (state, action) => {
        state.activites.push(action.payload);
      })
      .addCase(removeActivite.fulfilled, (state, action) => {
        state.activites = state.activites.filter(
          (activite) => activite.id !== action.payload
        );
      })
      .addCase(updateActivite.fulfilled, (state, action) => {
        const index = state.activites.findIndex(
          (a) => a.id === action.payload.id
        );
        if (index !== -1) {
          state.activites[index] = action.payload;
        }
      });
  },
});

export default activiteSlice.reducer;
