import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTaches } from "../store/tacheSlice";
import { RootState, AppDispatch } from "../store";
import TacheColumn from "../components/TacheColumn";
import AddTacheForm from "../components/AddTacheForm";
import Sidebar from "../components/SIdebar";

const TacheManagement: React.FC = () => {
  const { projectId, activiteId } = useParams<{
    projectId: string;
    activiteId: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const { taches, status, error } = useSelector(
    (state: RootState) => state.taches
  );

  useEffect(() => {
    if (projectId && activiteId) {
      dispatch(fetchTaches(parseInt(activiteId)));
    }
  }, [dispatch, projectId, activiteId]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  const todoTaches = taches.filter((tache) => tache.status === "todo");
  const inProgressTaches = taches.filter(
    (tache) => tache.status === "in_progress"
  );
  const doneTaches = taches.filter((tache) => tache.status === "done");

  return (
    <main className="flex">
      <Sidebar />
      <div className="p-4 w-[1500px]">
        <h2 className="text-2xl font-bold mb-4">Task Management</h2>
        <AddTacheForm activiteId={parseInt(activiteId!)} />
        <div className="flex space-x-4 mt-4">
          <TacheColumn title="To Do" taches={todoTaches} />
          <TacheColumn title="In Progress" taches={inProgressTaches} />
          <TacheColumn title="Done" taches={doneTaches} />
        </div>
      </div>
    </main>
  );
};

export default TacheManagement;
