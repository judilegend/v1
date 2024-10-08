import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { RootState, AppDispatch } from "../store";
import {
  fetchWorkPackages,
  updateWorkPackage,
} from "../store/workpackageSlice";
import { fetchActivites, updateActivite } from "../store/activiteSlice";
import { fetchTaches, updateTache } from "../store/tacheSlice";
import WorkPackageColumn from "./WorkPackageColumn";
import ActivityColumn from "./ActivityColumn";
import TacheColumn from "./TacheColumn";
import { useParams } from "react-router-dom";
//   const { workId } = useParams<{ projectId: string }>();

const KanbanBoard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projectId } = useParams<{ projectId: string }>();

  const [activeTab, setActiveTab] = useState<
    "workpackages" | "activities" | "tasks"
  >("workpackages");

  const workPackages = useSelector(
    (state: RootState) => state.workPackages.workPackages
  );
  const activities = useSelector(
    (state: RootState) => state.activities.activities
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
      const newStatus = destination.droppableId;
      dispatch(
        updateWorkPackage({
          id: parseInt(draggableId),
          workPackage: { status: newStatus },
        })
      );
    } else if (type === "activity") {
      const newStatus = destination.droppableId;
      dispatch(
        updateActivite({
          id: parseInt(draggableId),
          activite: { status: newStatus },
        })
      );
    } else if (type === "task") {
      const newStatus = destination.droppableId;
      dispatch(
        updateTache({ id: parseInt(draggableId), tache: { status: newStatus } })
      );
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === "workpackages"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("workpackages")}
        >
          Work Packages
        </button>
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === "activities"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("activities")}
        >
          Activities
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "tasks" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {activeTab === "workpackages" && (
            <>
              <Droppable droppableId="todo" type="workpackage">
                {(provided) => (
                  <WorkPackageColumn
                    title="To Do"
                    workPackages={workPackages.filter(
                      (wp) => wp.status === "todo"
                    )}
                    provided={provided}
                  />
                )}
              </Droppable>
              <Droppable droppableId="in_progress" type="workpackage">
                {(provided) => (
                  <WorkPackageColumn
                    title="In Progress"
                    workPackages={workPackages.filter(
                      (wp) => wp.status === "in_progress"
                    )}
                    provided={provided}
                  />
                )}
              </Droppable>
              <Droppable droppableId="done" type="workpackage">
                {(provided) => (
                  <WorkPackageColumn
                    title="Done"
                    workPackages={workPackages.filter(
                      (wp) => wp.status === "done"
                    )}
                    provided={provided}
                  />
                )}
              </Droppable>
            </>
          )}
          {activeTab === "activities" && (
            <>
              <Droppable droppableId="todo" type="activity">
                {(provided) => (
                  <ActivityColumn
                    title="To Do"
                    activities={activities.filter((a) => a.status === "todo")}
                    provided={provided}
                  />
                )}
              </Droppable>
              <Droppable droppableId="in_progress" type="activity">
                {(provided) => (
                  <ActivityColumn
                    title="In Progress"
                    activities={activities.filter(
                      (a) => a.status === "in_progress"
                    )}
                    provided={provided}
                  />
                )}
              </Droppable>
              <Droppable droppableId="done" type="activity">
                {(provided) => (
                  <ActivityColumn
                    title="Done"
                    activities={activities.filter((a) => a.status === "done")}
                    provided={provided}
                  />
                )}
              </Droppable>
            </>
          )}
          {activeTab === "tasks" && (
            <>
              <Droppable droppableId="todo" type="task">
                {(provided) => (
                  <TacheColumn
                    title="To Do"
                    taches={taches.filter((t) => t.status === "todo")}
                    provided={provided}
                  />
                )}
              </Droppable>
              <Droppable droppableId="in_progress" type="task">
                {(provided) => (
                  <TacheColumn
                    title="In Progress"
                    taches={taches.filter((t) => t.status === "in_progress")}
                    provided={provided}
                  />
                )}
              </Droppable>
              <Droppable droppableId="done" type="task">
                {(provided) => (
                  <TacheColumn
                    title="Done"
                    taches={taches.filter((t) => t.status === "done")}
                    provided={provided}
                  />
                )}
              </Droppable>
            </>
          )}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
