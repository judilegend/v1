export interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  deadline: string;
}

export interface RootState {
  projects: {
    projects: Project[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
}
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  isOnline: boolean;
}
export interface WorkPackage {
  id: number;
  projectId: number;
  name: string;
  description: string;
  status: "todo" | "in_progress" | "done";
}

export interface Activite {
  id: number;
  workPackageId: number;
  name: string;
  description: string;
  status: "todo" | "in_progress" | "done";
}

export interface Tache {
  id: number;
  activiteId: number;
  name: string;
  description: string;
  status: "todo" | "in_progress" | "done";
}

export interface Temps {
  id: number;
  tacheId: number;
  date: Date;
  pomodoroCount: number;
  notes: string;
}