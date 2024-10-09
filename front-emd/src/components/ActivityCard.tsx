import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateActivite, removeActivite } from "../store/slices/activiteSlice";
import { Activite } from "../types/types";
import { AppDispatch } from "../store";

interface Props {
  activity: Activite;
}

const ActivityCard: React.FC<Props> = ({ activity }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(activity.name);

  const handleStatusChange = (newStatus: "todo" | "in_progress" | "done") => {
    dispatch(
      updateActivite({
        id: activity.id,
        activite: { ...activity, status: newStatus },
      })
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(
      updateActivite({
        id: activity.id,
        activite: { name: editedName },
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeActivite(activity.id));
  };

  return (
    <div className="border p-2 mb-2 rounded">
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="w-full p-1 mb-2 border rounded"
        />
      ) : (
        <h3 className="text-lg font-semibold">{activity.name}</h3>
      )}
      <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
      <div className="flex justify-between items-center">
        <select
          value={activity.status}
          onChange={(e) =>
            handleStatusChange(
              e.target.value as "todo" | "in_progress" | "done"
            )
          }
          className="text-sm p-1 border rounded"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-2 py-1 rounded mr-2"
          >
            Delete
          </button>
          <Link
            to={`/project/${activity.workPackageId}/activite/${activity.id}/manage`}
            className="bg-purple-500 text-white px-2 py-1 rounded"
          >
            Manage Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
