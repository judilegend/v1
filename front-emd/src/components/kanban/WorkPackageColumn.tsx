import React from "react";
import { Droppable } from "react-beautiful-dnd";
import ActivityCard from "./ActivityCard";
import AddItemForm from "./AddItemForm";
import { Task, WorkPackage } from "../../types/Kanban";

interface WorkPackageColumnProps {
  workPackage: WorkPackage;
  onAddActivity: (title: string) => void;
  onAddTask: (activityId: string, title: string) => void;
  onUpdateTask: (
    activityId: string,
    taskId: string,
    updates: Partial<Task>
  ) => void;
  onDeleteTask: (activityId: string, taskId: string) => void;
}

const WorkPackageColumn: React.FC<WorkPackageColumnProps> = ({
  workPackage,
  onAddActivity,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-80 flex-shrink-0">
      <h2 className="text-xl font-semibold mb-4">{workPackage.title}</h2>
      <Droppable droppableId={workPackage.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4"
          >
            {workPackage.activities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                index={index}
                onAddTask={(title) => onAddTask(activity.id, title)}
                onUpdateTask={(taskId, updates) =>
                  onUpdateTask(activity.id, taskId, updates)
                }
                onDeleteTask={(taskId) => onDeleteTask(activity.id, taskId)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddItemForm onAdd={onAddActivity} placeholder="Add Activity" />
    </div>
  );
};

export default WorkPackageColumn;
