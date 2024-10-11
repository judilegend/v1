export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  assignee?: string;
  dueDate?: Date;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface WorkPackage {
  id: string;
  title: string;
  description: string;
  activities: Activity[];
}

export interface ProductBacklog {
  id: string;
  title: string;
  workPackages: WorkPackage[];
}
