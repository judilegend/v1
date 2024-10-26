// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { User } from "../types/type";
// import { getAllUsers, updateUserOnlineStatus } from "../services/userService";

// export const fetchUsers = createAsyncThunk<User[]>(
//   "users/fetchAll",
//   async () => {
//     return await getAllUsers();
//   }
// );

// export const updateUserStatusThunk = createAsyncThunk<  User,
//   { id: number; is_online: boolean }
// >("users/updateStatus", async ({ id, is_online }) => {
//   return await updateUserOnlineStatus(id, is_online);
// });

// interface UserState {
//   users: User[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: UserState = {
//   users: [],
//   status: "idle",
//   error: null,
// };

// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     updateUserStatus: (
//       state,
//       action: PayloadAction<{ id: number; is_online: boolean }>
//     ) => {
//       const index = state.users.findIndex(
//         (user) => user.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.users[index].is_online = action.payload.is_online;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
//         state.status = "succeeded";
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || null;
//       });
//   },
// });

// export const { updateUserStatus } = userSlice.actions;
// export default userSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/types";
import { getAllUsers, updateUserOnlineStatus } from "../services/userService";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchAll",
  async () => {
    return await getAllUsers();
  }
);

export const updateUserStatus = createAsyncThunk<
  User,
  { id: number; is_online: boolean }
>("users/updateStatus", async ({ id, is_online }) => {
  return await updateUserOnlineStatus(id, is_online);
});

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(
        updateUserStatus.fulfilled,
        (state, action: PayloadAction<User>) => {
          const index = state.users.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        }
      );
  },
});

export default userSlice.reducer;
