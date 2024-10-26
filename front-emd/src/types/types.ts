import { ReactNode } from "react";
import { Column } from "./Kanban";

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
  is_online: boolean;
}
export interface WorkPackage {
  title: ReactNode;
  activities: any;
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
export interface KanbanItem {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
}

export interface WorkPackageData {
  workPackages: { [key: number]: WorkPackage };
  columns: { [key: string]: Column };
  columnOrder: string[];
}
export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  is_online: boolean;
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: number;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

export interface DirectMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  read: boolean;
  timestamp: string;
}
