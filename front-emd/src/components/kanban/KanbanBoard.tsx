import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WorkPackageColumn from "./WorkPackageColumn";
import AddItemForm from "./AddItemForm";
import { WorkPackage, Activity, Task } from "../../types/Kanban";
import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/Button";
import { ActivityModal } from "../modals/ActivityModal";
import { RootState, AppDispatch } from "../../store/index";
import {
  fetchWorkPackages,
  addWorkPackage,
} from "../../store/slices/workpackageSlice";
import { addActivite } from "../../store/slices/activiteSlice";

const KanbanBoard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const workPackages = useSelector(
    (state: RootState) => state.workPackages.workPackages
  );
  const status = useSelector((state: RootState) => state.workPackages.status);

  const [isAddingWorkPackage, setIsAddingWorkPackage] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  useEffect(() => {
    if (projectId) {
      dispatch(fetchWorkPackages(parseInt(projectId)));
    }
  }, [dispatch, projectId]);

  const handleAddWorkPackage = async (title: string) => {
    if (projectId) {
      try {
        const newWorkPackage = await dispatch(
          addWorkPackage({
            title,
            projectId: parseInt(projectId),
            activities: [],
            status: "todo",
            name: title,
            description: "",
          })
        ).unwrap();
        setIsAddingWorkPackage(false);
        // Rafraîchir la liste des workpackages après l'ajout
        dispatch(fetchWorkPackages(parseInt(projectId)));
      } catch (error) {
        console.error("Failed to add work package:", error);
      }
    }
  };

  const handleUpdateWorkPackage = (updatedWorkPackage: WorkPackage) => {
    // Implement the logic to update a work package
    console.log("Updating work package:", updatedWorkPackage);
  };

  const handleAddActivity = async (workPackageId: number, title: string) => {
    if (projectId) {
      try {
        const newActivity = await dispatch(
          addActivite({
            workPackageId,
            title,
            description: "",
            // Add any other required fields for the activity
          })
        ).unwrap();

        // Optionally, you can refresh the work packages to reflect the new activity
        dispatch(fetchWorkPackages(parseInt(projectId)));
      } catch (error) {
        console.error("Failed to add activity:", error);
      }
    }
  };

  const handleUpdateActivity = (updatedActivity: Activity) => {
    // Implement the logic to update an activity
    console.log("Updating activity:", updatedActivity);
  };

  const handleAddTask = (activityId: string, newTask: Task) => {
    // Implement the logic to add a task to an activity
    console.log("Adding task to activity:", activityId, newTask);
  };

  if (status === "loading") {
    return <div className="p-6">Loading work packages...</div>;
  }

  if (status === "failed") {
    return (
      <div className="p-6 text-red-500">
        Error loading work packages. Please try again.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Project Kanban Board
      </h1>
      <div className="flex space-x-4 overflow-x-auto pb-8">
        {workPackages.map((workPackage, index) => (
          <WorkPackageColumn
            key={workPackage.id}
            workPackage={{ ...workPackage, id: workPackage.id.toString() }}
            onAddActivity={handleAddActivity}
            onUpdateWorkPackage={handleUpdateWorkPackage}
            onActivityClick={setSelectedActivity}
            index={index}
            onWorkPackageClick={() => {
              console.log("Work package clicked:", workPackage.id);
            }}
          />
        ))}

        <div className="flex-shrink-0 w-80">
          {isAddingWorkPackage ? (
            <AddItemForm
              onAdd={handleAddWorkPackage}
              placeholder="Enter Work Package Title"
              onCancel={() => setIsAddingWorkPackage(false)}
            />
          ) : (
            <Button
              onClick={() => setIsAddingWorkPackage(true)}
              variant="secondary"
              className="w-full h-10 flex items-center justify-center"
            >
              <FaPlus className="mr-2" /> Add Work Package
            </Button>
          )}
        </div>
      </div>
      {selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          isOpen={!!selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onUpdate={handleUpdateActivity}
          onAddTask={handleAddTask}
          users={[
            { id: "1", name: "User 1" },
            { id: "2", name: "User 2" },
          ]}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
