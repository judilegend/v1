import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as projectService from "../../services/projectService";
import { Project } from "../../types/types";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await projectService.getProjects();
    return response.data;
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (project: Omit<Project, "id">) => {
    const response = await projectService.createProject(project);
    return response.data;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, project }: { id: number; project: Partial<Project> }) => {
    const response = await projectService.updateProject(id, project);
    return response.data;
  }
);

export const removeProject = createAsyncThunk(
  "projects/removeProject",
  async (id: number) => {
    await projectService.deleteProject(id);
    return id;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [] as Project[],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      });
  },
});

export default projectSlice.reducer;
