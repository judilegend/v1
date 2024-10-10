import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { WorkPackage } from "../types/types";
import IconButton from "./ui/IconButton";

interface Props {
  workPackage: WorkPackage;
  index: number;
  onAddActivity: (wpId: string, activityTitle: string) => void;
  onAddTask: (wpId: string, activityId: string, taskTitle: string) => void;
}

const WorkPackageCard: React.FC<Props> = ({
  workPackage,
  index,
  onAddActivity,
  onAddTask,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Draggable draggableId={workPackage.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-white rounded-md shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-700">{workPackage.title}</h3>
            <IconButton
              icon={isExpanded ? "chevron-up" : "chevron-down"}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-600"
            />
          </div>
          {isExpanded && (
            <div className="mt-4 space-y-4">
              <h4 className="font-medium text-gray-600">Activities</h4>
              {workPackage.activities.map((activity: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; tasks: any[]; }) => (
                <div
                  key={activity.id}
                  className="pl-4 border-l-2 border-gray-200"
                >
                  <h5 className="font-medium text-gray-600">
                    {activity.title}
                  </h5>
                  <ul className="mt-2 space-y-2">
                    {activity.tasks.map((task) => (
                      <li key={task.id} className="flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(
                            task.status
                          )}`}
                        ></span>
                        <span className="text-sm text-gray-600">
                          {task.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onAddTask(workPackage.id.toString(), activity.id?.toString() ?? "", "")}
                    className="mt-2 text-sm text-blue-500 hover:text-blue-600"
                  >
                    + Add Task
                  </button>
                </div>
              ))}
              <button
                onClick={() => onAddActivity(workPackage.id.toString(), "")}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + Add Activity
              </button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};
const getStatusColor = (status: string) => {
  switch (status) {
    case "To Do":
      return "bg-gray-400";
    case "In Progress":
      return "bg-blue-400";
    case "To Test":
      return "bg-yellow-400";
    case "To Fix":
      return "bg-red-400";
    case "Completed":
      return "bg-green-400";
    default:
      return "bg-gray-400";
  }
};

export default WorkPackageCard;
