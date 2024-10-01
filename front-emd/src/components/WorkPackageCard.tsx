import React, { useState } from "react";
import { WorkPackage } from "../types/type";
import { useDispatch } from "react-redux";
import {
  updateWorkPackage,
  deleteWorkPackage,
} from "../store/workpackageSlice";
import { AppDispatch } from "../store";

interface Props {
  workPackage: WorkPackage;
}

const WorkPackageCard: React.FC<Props> = ({ workPackage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(workPackage.name);

  const handleStatusChange = (newStatus: "todo" | "in_progress" | "done") => {
    dispatch(updateWorkPackage({ ...workPackage, status: newStatus }));
  };

  const handleDelete = () => {
    dispatch(deleteWorkPackage(workPackage.id));
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch(updateWorkPackage({ ...workPackage, name: editedName }));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow">
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="w-full mb-2 p-1 border rounded"
        />
      ) : (
        <h3 className="font-semibold mb-2">{workPackage.name}</h3>
      )}
      <p className="text-sm text-gray-600 mb-2">{workPackage.description}</p>
      <div className="flex justify-between items-center">
        <select
          value={workPackage.status}
          onChange={(e) => handleStatusChange(e.target.value as "todo" | "in_progress" | "done")}
          className="text-sm p-1 border rounded"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div>
          <button onClick={handleEdit} className="text-blue-500 mr-2">
            {isEditing ? "Save" : "Edit"}
          </button>
          <button onClick={handleDelete} className="text-red-500">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkPackageCard;
