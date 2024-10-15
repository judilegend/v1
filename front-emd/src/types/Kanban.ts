export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

export interface Activity {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
  contributors?: string[];
  image?: string;
}

export interface WorkPackage {
  id: string;
  title: string;
  description?: string;
  activities: Activity[];
}

export interface Backlog {
  workPackages: WorkPackage[];
}
