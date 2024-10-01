import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkPackages } from "../store/workpackageSlice";
import { RootState, AppDispatch } from "../store";
import WorkPackageColumn from "../components/WorkPackageColumn";
import AddWorkPackageForm from "../components/AddWorkPackage";

const ProjectManagement: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { workPackages, status, error } = useSelector(
    (state: RootState) => state.workPackages
  );

  useEffect(() => {
    if (projectId) {
      dispatch(fetchWorkPackages(parseInt(projectId)));
    }
  }, [dispatch, projectId]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Management</h1>
      <AddWorkPackageForm projectId={parseInt(projectId!)} />
      <div className="flex space-x-4 mt-4">
        <WorkPackageColumn
          title="To Do"
          workPackages={workPackages.filter((wp) => wp.status === "todo")}
        />
        <WorkPackageColumn
          title="In Progress"
          workPackages={workPackages.filter(
            (wp) => wp.status === "in_progress"
          )}
        />
        <WorkPackageColumn
          title="Done"
          workPackages={workPackages.filter((wp) => wp.status === "done")}
        />
      </div>
    </div>
  );
};

export default ProjectManagement;
