// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateTache, removeTache } from "../store/tacheSlice";
// import { Tache } from "../types/type";

// interface Props {
//   tache: Tache;
// }

// const TacheItem: React.FC<Props> = ({ tache }) => {
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedName, setEditedName] = useState(tache.name);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     dispatch(updateTache({ id: tache.id, tache: { name: editedName } }));
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     dispatch(removeTache(tache.id));
//   };

//   return (
//     <div className="border p-2 mb-2 rounded">
//       {isEditing ? (
//         <input
//           type="text"
//           value={editedName}
//           onChange={(e) => setEditedName(e.target.value)}
//           className="w-full p-1 mb-2 border rounded"
//         />
//       ) : (
//         <h3 className="text-lg font-semibold">{tache.name}</h3>
//       )}
//       <p className="text-sm text-gray-600">{tache.description}</p>
//       <div className="mt-2">
//         {isEditing ? (
//           <button
//             onClick={handleSave}
//             className="bg-green-500 text-white px-2 py-1 rounded mr-2"
//           >
//             Save
//           </button>
//         ) : (
//           <button
//             onClick={handleEdit}
//             className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//           >
//             Edit
//           </button>
//         )}
//         <button
//           onClick={handleDelete}
//           className="bg-red-500 text-white px-2 py-1 rounded"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TacheItem;
