import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import WorkPackageColumn from "./WorkPackageColumn";
import AddItemForm from "./AddItemForm";
import useKanbanBoard from "../../hooks/useKanban";
import { WorkPackage, Activity, Task, Backlog } from "../../types/Kanban";
import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/Button";
import { ActivityModal } from "../modals/ActivityModal";

const KanbanBoard: React.FC = () => {
  const statusColumns = ["À faire", "En cours", "À corriger", "Complété"];

  const {
    backlog,
    handleDragEnd,
    addWorkPackage,
    addActivity,
    updateWorkPackage,
  } = useKanbanBoard();

  const [isAddingWorkPackage, setIsAddingWorkPackage] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const onDragEnd = (result: DropResult) => {
    handleDragEnd(result);
  };

  const handleAddWorkPackage = (title: string) => {
    addWorkPackage(title);
    setIsAddingWorkPackage(false);
  };

  const handleUpdateActivity = (updatedActivity: Activity) => {
    const updatedBacklog: Backlog = {
      workPackages: backlog.workPackages.map((wp) => ({
        ...wp,
        activities: wp.activities.map((act) =>
          act.id === updatedActivity.id ? updatedActivity : act
        ),
      })),
    };

    updateWorkPackage(updatedBacklog);
  };

  const handleAddTask = (activityId: string, newTask: Task) => {
    const updatedWorkPackages = backlog.workPackages.map((wp) => ({
      ...wp,
      activities: wp.activities.map((act) =>
        act.id === activityId ? { ...act, tasks: [...act.tasks, newTask] } : act
      ),
    }));

    updateWorkPackage({ ...backlog, workPackages: updatedWorkPackages });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Backlog</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="workPackages"
          direction="horizontal"
          type="COLUMN"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex space-x-4 overflow-x-auto pb-8"
            >
              {backlog.workPackages.map(
                (workPackage: WorkPackage, index: number) => (
                  <WorkPackageColumn
                    key={workPackage.id}
                    workPackage={workPackage}
                    index={index}
                    onAddActivity={(title) =>
                      addActivity(workPackage.id, title)
                    }
                    onUpdateWorkPackage={updateWorkPackage}
                    onWorkPackageClick={() => {}}
                    onActivityClick={(activity) =>
                      setSelectedActivity(activity)
                    }
                  />
                )
              )}
              {provided.placeholder}
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
          )}
        </Droppable>
        <div className="flex space-x-4 overflow-x-auto pb-8 mt-8">
          {statusColumns.map((status, index) => (
            <Droppable key={status} droppableId={status} type="TASK">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white p-4 rounded-lg shadow-md w-80 flex-shrink-0"
                >
                  <h2 className="text-lg font-semibold mb-4">{status}</h2>
                  {backlog.workPackages
                    .filter((wp) => wp.status === status)
                    .map((workPackage, wpIndex) => (
                      <Draggable
                        key={workPackage.id}
                        draggableId={workPackage.id}
                        index={wpIndex}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-100 p-2 mb-2 rounded"
                          >
                            {workPackage.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
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
            // ... more users
          ]}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
