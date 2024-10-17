export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
export interface Activity {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  attachments?: string[]; // You may want to add this to store attachment URLs
  contributors: [];
}

export interface WorkPackage {
  id: string;
  title: string;
  status: string;

  description?: string;
  activities: Activity[];
}

export interface Backlog {
  workPackages: WorkPackage[];
}
