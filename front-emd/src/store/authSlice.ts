// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   token: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   token: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setToken: (state, action: PayloadAction<{ token: string }>) => {
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//     },
//     clearToken: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//     },
//   },
// });
// export const { setToken, clearToken } = authSlice.actions;
// export default  authSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { login, register, logout } from "../services/authService";
import { RootState } from "./index";
import { jwtDecode } from "jwt-decode";
interface AuthState {
  user: { id: number; email: string; role: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token")!)
    : null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<
  { user: any; token: string },
  { email: string; password: string },
  { state: RootState }
>("auth/login", async (credentials) => {
  const response = await login(credentials);
  localStorage.setItem("token", response.token);
  return response;
});

export const registerUser = createAsyncThunk<
  { user: any; token: string },
  { username: string; email: string; password: string },
  { state: RootState }
>("auth/register", async (userData) => {
  const response = await register(userData);
  localStorage.setItem("token", response.token);
  return response;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await logout();
  localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: any; token: string }>) => {
          state.status = "succeeded";
          state.user = jwtDecode(action.payload.token);
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      )

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ user: any; token: string }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      )
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
