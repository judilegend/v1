import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as salleService from "../../services/salleService";

export const fetchSalles = createAsyncThunk(
  "salle/fetchSalles",
  salleService.getAllSalles
);
export const createSalle = createAsyncThunk(
  "salle/createSalle",
  (name: string) => salleService.createSalle(name)
);

const salleSlice = createSlice({
  name: "salle",
  initialState: {
    salles: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalles.fulfilled, (state, action) => {
        state.salles = action.payload.data;
      })
          .addCase(createSalle.fulfilled, (state, action) => {
            state.salles = [...state.salles, action.payload.data];
          });
      },
    });

export default salleSlice.reducer;
