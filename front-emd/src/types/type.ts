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
