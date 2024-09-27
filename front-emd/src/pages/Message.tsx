import React, { useState } from "react";
import Sidebar from "../components/SIdebar";

function Message() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus(
      "Project submitted successfully! Thank you for your submission."
    );
    setProjectTitle("");
    setProjectDescription("");
    setProjectBudget("");
    setProjectDeadline("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Submit a New Project
          </h1>
          <form onSubmit={handleSubmitProject} className="space-y-6">
            <div>
              <label
                htmlFor="projectTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Project Title
              </label>
              <input
                id="projectTitle"
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="projectDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Project Description
              </label>
              <textarea
                id="projectDescription"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="projectBudget"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Budget
                </label>
                <input
                  id="projectBudget"
                  type="number"
                  value={projectBudget}
                  onChange={(e) => setProjectBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="projectDeadline"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deadline
                </label>
                <input
                  id="projectDeadline"
                  type="date"
                  value={projectDeadline}
                  onChange={(e) => setProjectDeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Project
              </button>
            </div>
          </form>
          {submissionStatus && (
            <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
              {submissionStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
