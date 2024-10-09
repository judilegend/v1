import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateWorkPackage,
  removeWorkPackage,
} from "../store/slices/workpackageSlice";
import { WorkPackage } from "../types/types";
import { AppDispatch } from "../store";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  workPackage: WorkPackage;
  index: number;
}

const WorkPackageCard: React.FC<Props> = ({ workPackage, index }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(workPackage.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(
      updateWorkPackage({
        id: workPackage.id,
        workPackage: { name: editedName },
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeWorkPackage(workPackage.id));
  };

  return (
    <Draggable draggableId={workPackage.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border p-2 mb-2 rounded bg-white"
        >
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full p-1 mb-2 border rounded"
            />
          ) : (
            <h3 className="text-lg font-semibold">{workPackage.name}</h3>
          )}
          <p className="text-sm text-gray-600 mb-2">
            {workPackage.description}
          </p>
          <div className="flex justify-between items-center">
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
            <Link
              to={`/project/${workPackage.projectId}/workpackage/${workPackage.id}/manage`}
              className="bg-purple-500 text-white px-2 py-1 rounded"
            >
              Manage Activities
            </Link>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default WorkPackageCard;
