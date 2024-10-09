import React from "react";
import { Activite } from "../types/types";
import ActivityCard from "./ActivityCard";
import { DroppableProvided } from "react-beautiful-dnd";

interface Props {
  title: string;
  activities: Activite[];
  provided: DroppableProvided;
}

const ActivityColumn: React.FC<Props> = ({ title, activities, provided }) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3"
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      {provided.placeholder}
    </div>
  );
};

export default ActivityColumn;
