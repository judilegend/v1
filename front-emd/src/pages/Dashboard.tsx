import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../store/authSlice";
import Sidebar from "../components/SIdebar";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/");
  };



  // Mock project data (replace with actual data fetching logic)
  const projectProgress = 65;
  const projectPhases = [
    { name: "To Do", tasks: 3 },
    { name: "In Progress", tasks: 2 },
    { name: "Completed", tasks: 5 },
  ];
  const projectUpdates = [
    { date: "2023-04-15", message: "Phase 1 completed" },
    { date: "2023-04-10", message: "Started working on UI design" },
    { date: "2023-04-05", message: "Project kickoff meeting" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl mb-4">Welcome to Dashboard!</h1>
        
        {/* Project Progress Section */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Project Progress</h2>
          <div className="bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${projectProgress}%` }}
            ></div>
          </div>
          <p>{projectProgress}% Complete</p>
        </div>

        {/* Project Phases Section */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Project Phases</h2>
          <div className="flex justify-between">
            {projectPhases.map((phase) => (
              <div key={phase.name} className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">{phase.name}</h3>
                <p>{phase.tasks} tasks</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Updates Section */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Project Updates</h2>
          <ul className="bg-white rounded shadow">
            {projectUpdates.map((update, index) => (
              <li key={index} className="border-b p-4 last:border-b-0">
                <p className="font-bold">{update.date}</p>
                <p>{update.message}</p>
              </li>
            ))}
          </ul>
        </div>



        <button
          onClick={handleLogout}
          className="w-full p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;