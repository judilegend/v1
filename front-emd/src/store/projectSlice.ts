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

// On crée un 'slice' pour gérer les projets
const projectSlice = createSlice({
  // Le nom de ce morceau de code est 'projects'
  name: "projects",

  // On définit l'état initial de notre slice
  initialState: {
    // Une liste vide de projets, qui va se remplir plus tard
    projects: [] as Project[],

    // Le statut de la demande : 'idle' (au repos) au départ,
    // mais ça peut changer (par exemple : 'loading', 'succeeded', 'failed')
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",

    // Aucune erreur au début, mais si quelque chose tourne mal, on y mettra le message d'erreur
    error: null as string | null,
  },

  // Les 'reducers' permettent de changer l'état. Ici, on n'en utilise pas directement.
  reducers: {},

  // ExtraReducers gère des cas spécifiques quand certaines actions sont déclenchées
  extraReducers: (builder) => {
    // Quand on démarre la récupération des projets, on passe le statut à "loading"
    builder.addCase(fetchProjects.pending, (state) => {
      state.status = "loading";
    });

    // Quand la récupération des projets est réussie, on met à jour le statut et les projets
    builder.addCase(
      fetchProjects.fulfilled,
      (state, action: PayloadAction<Project[]>) => {
        state.status = "succeeded"; // La demande a réussi !
        state.projects = action.payload; // On remplace les projets par ceux récupérés
      }
    );

    // Quand la récupération des projets échoue, on passe le statut à 'failed' et on stocke l'erreur
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.status = "failed"; // La demande a échoué...
      state.error = action.error.message || null; // On enregistre le message d'erreur s'il y en a un
    });

    // Quand un projet est ajouté avec succès, on l'ajoute à la liste des projets
    builder.addCase(
      addProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload); // On ajoute le nouveau projet
      }
    );

    // Quand un projet est modifié, on remplace l'ancien par le nouveau
    builder.addCase(
      editProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        const index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload; // On remplace le projet à l'index trouvé
        }
      }
    );

    // Quand un projet est supprimé, on le retire de la liste
    builder.addCase(
      removeProject.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
        // On garde seulement les projets qui n'ont pas cet ID
      }
    );
  },
});

export default projectSlice.reducer;
