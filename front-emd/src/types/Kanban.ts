import { WorkPackage } from "./types";

export interface KanbanItem {
  name: any;
  id: string;
  content: string;
  tags: string[];
}

export interface KanbanColumn {
  workPackageIds: any;
  id: string;
  title: string;
  itemIds: string[];
}

export interface KanbanData {
  columns: { [key: string]: KanbanColumn };
  items: { [key: string]: KanbanItem };
  columnOrder: string[];
}
export interface Column {
  id: string;
  title: string;
  workPackageIds: string[];
}

export interface WorkPackageData {
  workPackages: { [key: string]: WorkPackage };
  columns: { [key: string]: Column };
  columnOrder: string[];
}
