import React from "react";
import { Droppable } from "react-beautiful-dnd";
import WorkPackageCard from "./WorkPackageCard";
import { WorkPackage } from "../types/types";
import { Column } from "../types/Kanban";

interface Props {
  column: Column;
  workPackages: WorkPackage[];
  onAddActivity: (wpId: string, activityTitle: string) => void;
  onAddTask: (wpId: string, activityId: string, taskTitle: string) => void;
}

const WorkPackageColumn: React.FC<Props> = ({
  column,
  workPackages,
  onAddActivity,
  onAddTask,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-80 flex-shrink-0">
      <h2 className="p-4 bg-gray-50 rounded-t-lg border-b border-gray-200 text-lg font-semibold text-gray-700">
        {column.title}
      </h2>
      <Droppable droppableId={column.id} type="WORKPACKAGE">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="p-4 space-y-4 min-h-[200px]"
          >
            {workPackages.map((workPackage, index) => (
              <WorkPackageCard
                key={workPackage.id}
                workPackage={workPackage}
                index={index}
                onAddActivity={onAddActivity}
                onAddTask={onAddTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default WorkPackageColumn;
