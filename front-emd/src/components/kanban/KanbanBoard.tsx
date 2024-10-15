import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import WorkPackageColumn from "./WorkPackageColumn";
import AddItemForm from "./AddItemForm";
import useKanbanBoard from "../../hooks/useKanban";
import { WorkPackage } from "../../types/Kanban";
import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/Button";

const KanbanBoard: React.FC = () => {
  const {
    backlog,
    handleDragEnd,
    addWorkPackage,
    addActivity,
    updateWorkPackage,
  } = useKanbanBoard();

  const [isAddingWorkPackage, setIsAddingWorkPackage] = useState(false);

  const onDragEnd = (result: DropResult) => {
    handleDragEnd(result);
  };

  const handleAddWorkPackage = (title: string) => {
    addWorkPackage(title);
    setIsAddingWorkPackage(false);
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
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
