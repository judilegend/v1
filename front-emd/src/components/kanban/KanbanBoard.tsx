import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import WorkPackageColumn from "./WorkPackageColumn";
import AddItemForm from "./AddItemForm";
import useKanbanBoard from "../../hooks/useKanban";

const KanbanBoard: React.FC = () => {
  const {
    backlog,
    handleDragEnd,
    addWorkPackage,
    addActivity,
    addTask,
    updateTask,
    deleteTask,
  } = useKanbanBoard();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Project Backlog</h1>
      <AddItemForm onAdd={addWorkPackage} placeholder="Add Work Package" />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-8">
          {backlog.workPackages.map((workPackage) => (
            <WorkPackageColumn
              key={workPackage.id}
              workPackage={workPackage}
              onAddActivity={(title) => addActivity(workPackage.id, title)}
              onAddTask={(activityId, title) =>
                addTask(workPackage.id, activityId, title)
              }
              onUpdateTask={(activityId, taskId, updates) =>
                updateTask(workPackage.id, activityId, taskId, updates)
              }
              onDeleteTask={(activityId, taskId) =>
                deleteTask(workPackage.id, activityId, taskId)
              }
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
