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
import Layout from "./components/layout/Layout";
import KanbanBoard from "./components/kanban/KanbanBoard";
import QuoteRequest from "./pages/QuoteRequest";
import { RootState } from "./store";
import SprintManagement from "./pages/SprintManagement";
import TaskManagement from "./pages/TaskManagement";
import Messaging from "./pages/Messaging";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <AuthForm />
          }
        />
      </Routes>
      <Layout>
        <Routes>
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/sprints"
            element={
              isAuthenticated ? <SprintManagement /> : <Navigate to="/" />
            }
          />
          <Route
            path="/projects"
            element={isAuthenticated ? <Project /> : <Navigate to="/" />}
          />
          <Route
            path="/kanban/:projectId"
            element={isAuthenticated ? <KanbanBoard /> : <Navigate to="/" />}
          />
          <Route
            path="/kanban/"
            element={isAuthenticated ? <KanbanBoard /> : <Navigate to="/" />}
          />
          {/* <Route
            path="/chat"
            element={isAuthenticated ? <Chat /> : <Navigate to="/" />}
          /> */}
          {/* <Route
            path="/messagerie"
            element={isAuthenticated ? <Messagerie /> : <Navigate to="/" />}
          /> */}
          <Route
            path="/messages"
            element={isAuthenticated ? <Messaging /> : <Navigate to="/" />}
          />
          <Route
            path="/request-quote"
            element={isAuthenticated ? <QuoteRequest /> : <Navigate to="/" />}
          />
          <Route
            path="/task-management/:activityId"
            element={isAuthenticated ? <TaskManagement /> : <Navigate to="/" />}
          />
          <Route
            path="/task-management/"
            element={isAuthenticated ? <TaskManagement /> : <Navigate to="/" />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
