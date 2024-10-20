import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WorkPackage, Activity } from "../../types/Kanban";
import { Button } from "../ui/Button";
import { FaPlus, FaUser, FaImage } from "react-icons/fa";
import AddItemForm from "./AddItemForm";
import { RootState, AppDispatch } from "../../store";
import { fetchTaches } from "../../store/slices/tacheSlice";

interface WorkPackageColumnProps {
  workPackage: WorkPackage;
  onAddActivity: (workPackageId: number, title: string) => void;
  onUpdateWorkPackage: (updatedWorkPackage: WorkPackage) => void;
  onActivityClick: (activity: Activity) => void;
  index: number;
  onWorkPackageClick: () => void;
}

const WorkPackageColumn: React.FC<WorkPackageColumnProps> = ({
  workPackage,
  onAddActivity,
  onUpdateWorkPackage,
  onActivityClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const taches = useSelector((state: RootState) => state.taches.taches);

  useEffect(() => {
    workPackage.activities.forEach((activity) => {
      dispatch(fetchTaches(parseInt(activity.id)));
    });
  }, [dispatch, workPackage.activities]);

  const handleAddActivity = (title: string) => {
    onAddActivity(parseInt(workPackage.id), title);
    setIsAddingActivity(false);
  };

  const getActivityTaskCount = (activityId: string) => {
    return taches.filter((tache) => tache.activiteId === parseInt(activityId))
      .length;
  };

  const getActivityImage = (activity: Activity): string | null => {
    if (!Array.isArray(activity.tasks)) {
      return null;
    }

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
    const taskCount = getActivityTaskCount(activity.id);

    return (
      <div
        key={activity.id}
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 mb-4"
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
          <span className="text-sm text-gray-600">{taskCount} tasks</span>
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
    <div className="bg-white rounded-lg shadow-md p-4 w-80 flex-shrink-0">
      <h2 className="text-xl font-semibold mb-4">{workPackage.title}</h2>
      <div className="space-y-4">
        {workPackage.activities && workPackage.activities.length > 0 ? (
          workPackage.activities.map((activity) => renderActivityCard(activity))
        ) : (
          <p>No activities yet</p>
        )}
      </div>
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
  );
};

export default WorkPackageColumn;
