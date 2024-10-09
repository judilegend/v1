import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTache, removeTache } from "../store/slices/tacheSlice";
import { Tache } from "../types/types";
import { AppDispatch } from "../store";

interface Props {
  tache: Tache;
}

const TacheCard: React.FC<Props> = ({ tache }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(tache.name);

  const handleStatusChange = (newStatus: "todo" | "in_progress" | "done") => {
    dispatch(
      updateTache({
        id: tache.id,
        tache: { ...tache, status: newStatus },
      })
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(
      updateTache({
        id: tache.id,
        tache: { name: editedName },
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeTache(tache.id));
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
        <h3 className="text-lg font-semibold">{tache.name}</h3>
      )}
      <p className="text-sm text-gray-600 mb-2">{tache.description}</p>
      <div className="flex justify-between items-center">
        <select
          value={tache.status}
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
        </div>
      </div>
    </div>
  );
};

export default TacheCard;
