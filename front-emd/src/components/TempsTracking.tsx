// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTemps, addTemps } from "../store/tempsSlice";
// import { RootState, AppDispatch } from "../store";

// const TempsTracking: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { temps, status, error } = useSelector(
//     (state: RootState) => state.temps
//   );
//   const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
//   const [timerActive, setTimerActive] = useState(false);
//   const [timerSeconds, setTimerSeconds] = useState(0);

//   useEffect(() => {
//     if (selectedTaskId) {
//       dispatch(fetchTemps(selectedTaskId));
//     }
//   }, [dispatch, selectedTaskId]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (timerActive) {
//       interval = setInterval(() => {
//         setTimerSeconds((seconds) => seconds + 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timerActive]);

//   const handleStartTimer = () => {
//     setTimerActive(true);
//   };

//   const handleStopTimer = () => {
//     setTimerActive(false);
//     if (selectedTaskId) {
//       dispatch(addTemps({ tacheId: selectedTaskId, duration: timerSeconds }));
//     }
//     setTimerSeconds(0);
//   };

//   if (status === "loading") return <div>Loading...</div>;
//   if (status === "failed") return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Time Tracking</h2>
//       <select
//         onChange={(e) => setSelectedTaskId(Number(e.target.value))}
//         className="w-full p-2 mb-4 border rounded"
//       >
//         <option value="">Select a task</option>
//         {/* Add options for tasks here */}
//       </select>
//       {selectedTaskId && (
//         <div>
//           <p className="text-xl mb-2">Timer: {timerSeconds} seconds</p>
//           {!timerActive ? (
//             <button
//               onClick={handleStartTimer}
//               className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//             >
//               Start Timer
//             </button>
//           ) : (
//             <button
//               onClick={handleStopTimer}
//               className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//             >
//               Stop Timer
//             </button>
//           )}
//         </div>
//       )}
//       <h3 className="text-xl font-bold mt-4 mb-2">Recorded Times</h3>
//       {temps.map((temps) => (
//         <div key={temps.id} className="mb-2">
//           <p>Duration: {temps.duration} seconds</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TempsTracking;
