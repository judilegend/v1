import React from "react";
import { useDispatch } from "react-redux";
import { updateActivite, removeActivite } from "../store/activiteSlice";
import { Activite } from "../types/type";
import { AppDispatch } from "../store";

interface Props {
  activity: Activite;
}

const ActivityColumn: React.FC<Props> = ({ activity }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleStatusChange = (newStatus: "todo" | "in_progress" | "done") => {
    dispatch(
      updateActivite({ id: activity.id, activite: { status: newStatus } })
    );
  };

  const handleDelete = () => {
    dispatch(removeActivite(activity.id));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-64">
      <h3 className="text-xl font-semibold mb-2">{activity.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{activity.description}</p>
      <select
        value={activity.status}
        onChange={(e) =>
          handleStatusChange(e.target.value as "todo" | "in_progress" | "done")
        }
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default ActivityColumn;
