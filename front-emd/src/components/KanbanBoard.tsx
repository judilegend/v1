import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { RootState, AppDispatch } from "../store";
import {
  fetchWorkPackages,
  updateWorkPackage,
} from "../store/slices/workpackageSlice";
import { fetchActivites, updateActivite } from "../store/slices/activiteSlice";
import { fetchTaches, updateTache } from "../store/slices/tacheSlice";
import WorkPackageColumn from "./WorkPackageColumn";
import ActivityColumn from "./ActivityColumn";
import TacheColumn from "./TacheColumn";
import { useParams } from "react-router-dom";
import DroppableWrapper from "./DroppableWrapper";

const KanbanBoard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projectId } = useParams<{ projectId: string }>();

  const [activeTab, setActiveTab] = useState<
    "workpackages" | "activities" | "tasks"
  >("workpackages");

  const workPackages = useSelector(
    (state: RootState) => state.workPackages.workPackages
  );
  const activites = useSelector(
    (state: RootState) => state.activities.activites
  );
  const taches = useSelector((state: RootState) => state.taches.taches);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchWorkPackages(parseInt(projectId)));
      dispatch(fetchActivites(parseInt(projectId)));
      dispatch(fetchTaches(parseInt(projectId)));
    }
  }, [dispatch, projectId]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "workpackage") {
      dispatch(
        updateWorkPackage({
          id: parseInt(draggableId),
          workPackage: { status: destination.droppableId },
        })
      );
    } else if (type === "activity") {
      dispatch(
        updateActivite({
          id: parseInt(draggableId),
          activite: { status: destination.droppableId },
        })
      );
    } else if (type === "task") {
      dispatch(
        updateTache({
          id: parseInt(draggableId),
          tache: { status: destination.droppableId },
        })
      );
    }
  };

  const renderColumn = useMemo(
    () =>
      (
        status: string,
        items: any[],
        ColumnComponent: React.ComponentType<any>
      ) =>
        (
          <DroppableWrapper droppableId={status} type={activeTab}>
            {(provided) => (
              <ColumnComponent
                title={
                  status === "todo"
                    ? "To Do"
                    : status === "in_progress"
                    ? "In Progress"
                    : "Done"
                }
                items={items.filter((item) => item.status === status)}
                provided={provided}
              />
            )}
          </DroppableWrapper>
        ),
    [activeTab]
  );

  const columns = useMemo(() => {
    const statuses = ["todo", "in_progress", "done"];
    let items, ColumnComponent;

    switch (activeTab) {
      case "workpackages":
        items = workPackages;
        ColumnComponent = WorkPackageColumn;
        break;
      case "activities":
        items = activites;
        ColumnComponent = ActivityColumn;
        break;
      case "tasks":
        items = taches;
        ColumnComponent = TacheColumn;
        break;
      default:
        return null;
    }

    return statuses.map((status) =>
      renderColumn(status, items, ColumnComponent)
    );
  }, [activeTab, workPackages, activites, taches, renderColumn]);

  return (
    <div className="p-4">
      <div className="mb-4">
        {["workpackages", "activities", "tasks"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 mr-2 ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">{columns}</div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
