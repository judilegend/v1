import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import WorkPackageColumn from "../WorkPackageColumn";
import AddWorkPackage from "../AddWorkPackage";
import {
  WorkPackageData,
  WorkPackage,
  Activite,
  Tache,
} from "../../types/types";
import { handleDragEnd } from "../../utils/dragAndDrop";
import { KanbanColumn, KanbanItem } from "../../types/Kanban";

const workflowStatuses = [
  "To Do",
  "In Progress",
  "To Test",
  "To Fix",
  "Completed",
];

const initialData: WorkPackageData = {
  workPackages: {},
  columns: workflowStatuses.reduce(
    (acc, status) => ({
      ...acc,
      [status]: { id: status, title: status, workPackageIds: [] },
    }),
    {}
  ),
  columnOrder: workflowStatuses,
};

const KanbanBoard: React.FC = () => {
  const [data, setData] = useState<WorkPackageData>(initialData);

  const onDragEnd = (result: DropResult) => {
    const newData = handleDragEnd(result, {
      items: data.workPackages,
      columns: data.columns,
      columnOrder: data.columnOrder,
    });
    setData({
      workPackages: Object.fromEntries(
        Object.entries(newData.items).map(([key, workPackage]) => [
          key,
          {
            ...workPackage,
            content: workPackage.name,
            tags: [],
          }
        ])
      ) as { [key: string]: KanbanItem },
      columns: Object.fromEntries(
        Object.entries(newData.columns).map(([key, column]) => [
          key,
          { ...column, itemIds: column.workPackageIds }
        ])
      ) as { [key: string]: KanbanColumn },
      columnOrder: newData.columnOrder,
    });
  };
  const handleAddWorkPackage = (name: string) => {
    const newWorkPackage: WorkPackage = {
      id: Date.now(),
      projectId: 0, // You might want to set this dynamically
      name,
      description: "",
      status: "todo",
      activities: [],
    };

    setData((prevData) => ({
      ...prevData,
      workPackages: {
        ...prevData.workPackages,
        [newWorkPackage.id]: newWorkPackage,
      },
      columns: {
        ...prevData.columns,
        "To Do": {
          ...prevData.columns["To Do"],
          workPackageIds: [
            ...prevData.columns["To Do"].workPackageIds,
            newWorkPackage.id.toString(),
          ],
        },
      },
    }));
  };

  const handleAddActivity = (wpId: number, activityName: string) => {
    setData((prevData) => {
      const workPackage = prevData.workPackages[wpId];
      const newActivity: Activite = {
        id: Date.now(),
        workPackageId: wpId,
        name: activityName,
        description: "",
        status: "todo",
      };
      return {
        ...prevData,
        workPackages: {
          ...prevData.workPackages,
          [wpId]: {
            ...workPackage,
            activities: [...workPackage.activities, newActivity],
          },
        },
      };
    });  };

  const handleAddTask = (
    wpId: number,
    activityId: number,
    taskName: string
  ) => {
    setData((prevData) => {
      const workPackage = prevData.workPackages[wpId];
      const updatedActivities = workPackage.activities.map((activity: { id: number; tasks: any; }) => {
        if (activity.id === activityId) {
          const newTask: Tache = {
            id: Date.now(),
            activiteId: activityId,
            name: taskName,
            description: "",
            status: "todo",
          };
          return {
            ...activity,
            tasks: [...activity.tasks, newTask],
          };
        }
        return activity;
      });
      return {
        ...prevData,
        workPackages: {
          ...prevData.workPackages,
          [wpId]: {
            ...workPackage,
            activities: updatedActivities,
          },
        },
      };
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Project Management Board
      </h1>
      <AddWorkPackage onAddWorkPackage={handleAddWorkPackage} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-6 overflow-x-auto pb-8 mt-8">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const workPackages = column.workPackageIds.map(
              (wpId) => data.workPackages[wpId as unknown as keyof typeof data.workPackages]            );
            return (
              <WorkPackageColumn
                key={column.id}
                column={column}
                workPackages={workPackages}
                onAddActivity={(wpId: string, activityName: string) => handleAddActivity(Number(wpId), activityName)}
                onAddTask={(wpId: string, activityId: string, taskName: string) => handleAddTask(Number(wpId), Number(activityId), taskName)}
              />
            );
          })}        </div>
      </DragDropContext>
    </div>
  );

};
export default KanbanBoard;