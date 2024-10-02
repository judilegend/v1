// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTaches, addTache } from "../store/tacheSlice";
// import { RootState, AppDispatch } from "../store";
// import TacheItem from "./TacheItem";

// const TacheList: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { taches, status, error } = useSelector(
//     (state: RootState) => state.taches
//   );
//   const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
//     null
//   );

//   useEffect(() => {
//     if (selectedActivityId) {
//       dispatch(fetchTaches(selectedActivityId));
//     }
//   }, [dispatch, selectedActivityId]);

//   const handleAddTache = () => {
//     if (selectedActivityId) {
//       const newTache = {
//         name: "New Task",
//         description: "",
//         activiteId: selectedActivityId,
//         status: "todo" as const,
//       };
//       dispatch(addTache(newTache));
//     }
//   };

//   if (status === "loading") return <div>Loading...</div>;
//   if (status === "failed") return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Tasks</h2>
//       <select
//         onChange={(e) => setSelectedActivityId(Number(e.target.value))}
//         className="w-full p-2 mb-4 border rounded"
//       >
//         <option value="">Select an activity</option>
//         {/* Add options for activities here */}
//       </select>
//       {selectedActivityId && (
//         <button
//           onClick={handleAddTache}
//           className="bg-green-500 text-white px-4 py-2 rounded mb-4"
//         >
//           Add Task
//         </button>
//       )}
//       {taches.map((tache) => (
//         <TacheItem key={tache.id} tache={tache} />
//       ))}
//     </div>
//   );
// };

// export default TacheList;
