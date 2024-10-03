import React from "react";
import { Activite } from "../types/type";
import ActivityCard from "./ActivityCard";

interface Props {
  title: string;
  activities: Activite[];
}

const ActivityColumn: React.FC<Props> = ({ title, activities }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivityColumn;
