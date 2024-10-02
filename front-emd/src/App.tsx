import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AuthForm from "./components/AuthForm";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import ProjectManagement from "./pages/ProjectManagement";
import Chat from "./pages/Chat";
import Messagerie from "./pages/Messagerie";
// import WorkflowManagement from "./pages/workfowManagement";
import ActivityManagement from "./pages/ActiviteManagement";
import { RootState } from "./store";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <AuthForm />
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/projects"
            element={isAuthenticated ? <Project /> : <Navigate to="/" />}
          />
          <Route
            path="/project/:projectId/manage"
            element={
              isAuthenticated ? <ProjectManagement /> : <Navigate to="/" />
            }
          />
          <Route
            path="/chat"
            element={isAuthenticated ? <Chat /> : <Navigate to="/" />}
          />
          <Route
            path="/messagerie"
            element={isAuthenticated ? <Messagerie /> : <Navigate to="/" />}
          />
          <Route
            path="/workpackage/:workflowId/manage"
            element={
              isAuthenticated ? <ActivityManagement /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
