import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchActivites } from "../store/activiteSlice";
import { RootState, AppDispatch } from "../store";
import ActivityColumn from "../components/ActivityColumn";
import AddActivityForm from "../components/AddActivityForm";
import Sidebar from "../components/SIdebar";

const ActivityManagement: React.FC = () => {
  const { projectId, workPackageId } = useParams<{
    projectId: string;
    workPackageId: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const { activities, status, error } = useSelector(
    (state: RootState) => state.activities
  );
  useEffect(() => {
    if (projectId && workPackageId) {
      dispatch(fetchActivites(parseInt(workPackageId)));
    }
    console.log("Project ID:", projectId, "WorkPackage ID:", workPackageId);
  }, [dispatch, projectId, workPackageId]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <main className="flex">
      <Sidebar />
      <div className="p-4 w-[1500px]">
        <h2 className="text-2xl font-bold mb-4">Activity Management</h2>
        <AddActivityForm workPackageId={parseInt(workPackageId!)} />
        <div className="flex space-x-4 mt-4">
          {activities.map((activity) => (
            <ActivityColumn key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ActivityManagement;
