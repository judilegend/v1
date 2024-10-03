// import React, { useState } from 'react';
// import { WorkPackage } from '../types/type';
// import { useDispatch } from 'react-redux';
// import { updateWorkPackage, removeWorkPackage } from '../store/workpackageSlice';
// import { AppDispatch } from '../store';

// interface Props {
//   workPackage: WorkPackage;
// }

// const WorkPackageCard: React.FC<Props> = ({ workPackage }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedName, setEditedName] = useState(workPackage.name);

//   const handleStatusChange = (newStatus: "todo" | "in_progress" | "done") => {
//     dispatch(
//       updateWorkPackage({
//         id: workPackage.id,
//         workPackage: { ...workPackage, status: newStatus },
//       })
//     );
//   };

//   const handleDelete = () => {
//     dispatch(removeWorkPackage(workPackage.id));
//   };

//   const handleEdit = () => {
//     if (isEditing) {
//       dispatch(
//         updateWorkPackage({
//           id: workPackage.id,
//           workPackage: { ...workPackage, name: editedName },
//         })
//       );
//     }
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div className="bg-white p-4 rounded-md shadow">
//       {isEditing ? (
//         <input
//           type="text"
//           value={editedName}
//           onChange={(e) => setEditedName(e.target.value)}
//           className="w-full mb-2 p-1 border rounded"
//         />
//       ) : (
//         <h3 className="font-semibold mb-2">{workPackage.name}</h3>
//       )}
//       <p className="text-sm text-gray-600 mb-2">{workPackage.description}</p>
//       <div
//         className="flex justify-between items-center"
//       >
//         <select
//           value={workPackage.status}
//           onChange={(e) =>
//             handleStatusChange(
//               e.target.value as "todo" | "in_progress" | "done"
//             )
//           }
//           className="text-sm p-1 border rounded"
//         >
//           <option value="todo">To Do</option>
//           <option value="in_progress">In Progress</option>
//           <option value="done">Done</option>
//         </select>
//         <div>
//           <button onClick={handleEdit} className="text-blue-500 mr-2">
//             {isEditing ? "Save" : "Edit"}
//           </button>
//           <button onClick={handleDelete} className="text-red-500">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkPackageCard;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  updateWorkPackage,
  removeWorkPackage,
} from "../store/workpackageSlice";
import { WorkPackage } from "../types/type";
import { AppDispatch } from "../store";

interface Props {
  workPackage: WorkPackage;
}

const WorkPackageCard: React.FC<Props> = ({ workPackage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(workPackage.name);

  const handleStatusChange = (newStatus: "todo" | "in_progress" | "done") => {
    dispatch(
      updateWorkPackage({
        id: workPackage.id,
        workPackage: { ...workPackage, status: newStatus },
      })
    );
  };
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

  // const handleManage = () => {
  //   navigate(`/workpackage/${workPackage.id}/manage`);
  // };

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
        <h3 className="text-lg font-semibold">{workPackage.name}</h3>
      )}
      <p className="text-sm text-gray-600 mb-2">{workPackage.description}</p>
      <div className="flex justify-between items-center">
        <select
          value={workPackage.status}
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
          {/* <button
            onClick={handleManage}
            className="bg-purple-500 text-white px-2 py-1 rounded"
          >
            Manage
          </button> */}
          <Link
            to={`/project/${workPackage.projectId}/workpackage/${workPackage.id}/manage`}
            className="bg-purple-500 text-white px-2 py-1 rounded"
          >
            Manage Activities
          </Link>
        </div>
      </div>
    </div>
  );
};
export default WorkPackageCard;
