import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { WorkPackage, Activity } from "../../types/Kanban";
import { Button } from "../ui/Button";
import { FaPlus, FaUser, FaImage } from "react-icons/fa";
import AddItemForm from "./AddItemForm";

interface WorkPackageColumnProps {
  workPackage: WorkPackage;
  index: number;
  onAddActivity: (workPackageId: string, title: string) => void;
  onUpdateWorkPackage: (updatedWorkPackage: WorkPackage) => void;
  onWorkPackageClick: () => void;
  onActivityClick: (activity: Activity) => void;
}

const WorkPackageColumn: React.FC<WorkPackageColumnProps> = ({
  workPackage,
  index,
  onAddActivity,
  onUpdateWorkPackage,
  onWorkPackageClick,
  onActivityClick,
}) => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);

  const handleAddActivity = (title: string) => {
    onAddActivity(workPackage.id, title);
    setIsAddingActivity(false);
  };

  const getActivityImage = (activity: Activity): string | null => {
    for (const task of activity.tasks) {
      if (task.description && task.description.includes("![")) {
        const match = task.description.match(/!\[.*?\]\((.*?)\)/);
        if (match && match[1]) {
          return match[1];
        }
      }
    }
    return null;
  };

  const renderActivityCard = (activity: Activity) => {
    const activityImage = getActivityImage(activity);

    return (
      <div
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
        onClick={() => onActivityClick(activity)}
      >
        {activityImage ? (
          <div className="relative w-full h-32 mb-2">
            <img
              src={activityImage}
              alt={activity.title}
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm truncate">
              {activity.title}
            </div>
          </div>
        ) : (
          <div className="bg-gray-200 w-full h-32 flex items-center justify-center mb-2 rounded">
            <FaImage className="text-gray-400 text-4xl" />
          </div>
        )}
        <h3 className="font-medium text-lg mb-2">
          {activity.title || `Activity ${activity.id}`}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {activity.tasks.length} tasks
          </span>
          <div className="flex items-center">
            {activity.contributors?.map((contributor, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs -ml-2 first:ml-0"
              >
                <FaUser />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Draggable draggableId={workPackage.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg shadow-md p-4 w-80 flex-shrink-0"
        >
          <h2
            className="text-xl font-semibold mb-4 cursor-pointer"
            onClick={onWorkPackageClick}
          >
            {workPackage.title}
          </h2>
          <Droppable droppableId={workPackage.id} type="ACTIVITY">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                {workPackage.activities.map((activity, activityIndex) => (
                  <Draggable
                    key={activity.id}
                    draggableId={activity.id}
                    index={activityIndex}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {renderActivityCard(activity)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {isAddingActivity ? (
            <AddItemForm
              onAdd={handleAddActivity}
              placeholder="Enter Activity Title"
              onCancel={() => setIsAddingActivity(false)}
            />
          ) : (
            <Button
              onClick={() => setIsAddingActivity(true)}
              className="mt-4 w-full"
              variant="primary"
            >
              <FaPlus className="mr-2" /> Add Activity
            </Button>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default WorkPackageColumn;
