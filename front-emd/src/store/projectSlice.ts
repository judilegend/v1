import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from "../services/projectService";
import { Project, RootState } from "../types/type";

export const fetchProjects = createAsyncThunk<
  Project[],
  void,
  { state: RootState }
>("projects/fetchAll", async () => {
  return await getAllProjects();
});

export const addProject = createAsyncThunk<
  Project,
  Omit<Project, "id">,
  { state: RootState }
>("projects/add", async (project) => {
  return await createProject(project);
});

export const editProject = createAsyncThunk<
  Project,
  { id: number; project: Partial<Project> },
  { state: RootState }
>("projects/edit", async ({ id, project }) => {
  return await updateProject(id, project);
});

export const removeProject = createAsyncThunk<
  number,
  number,
  { state: RootState }
>("projects/remove", async (id) => {
  await deleteProject(id);
  return id;
});

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [] as Project[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.status = "succeeded";
          state.projects = action.payload;
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        addProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.projects.push(action.payload);
        }
      )
      .addCase(
        editProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          const index = state.projects.findIndex(
            (project) => project.id === action.payload.id
          );
          if (index !== -1) {
            state.projects[index] = action.payload;
          }
        }
      )
      .addCase(
        removeProject.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.projects = state.projects.filter(
            (project) => project.id !== action.payload
          );
        }
      );
  },
});

export default projectSlice.reducer;
