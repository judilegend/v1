import React from "react";
import { WorkPackage } from "../types/types";
import WorkPackageCard from "./WorkPackageCard";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
interface Props {
  title: string;
  workPackages: WorkPackage[];
  provided: DroppableProvided;
}
const WorkPackageColumn: React.FC<Props> = ({
  title,
  workPackages,
  provided,
}) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3"
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {workPackages.map((workPackage, index) => (
          <WorkPackageCard
            key={workPackage.id}
            workPackage={workPackage}
            index={index}
          />
        ))}
      </div>
      {provided.placeholder}
    </div>
  );
};

export default WorkPackageColumn;
