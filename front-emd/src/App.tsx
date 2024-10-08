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
import KanbanBoard from "./components/KanbanBoard";
import Chat from "./pages/Chat";
import Messagerie from "./pages/Messagerie";
import QuoteRequest from "./pages/QuoteRequest";
import { RootState } from "./store";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Router>
      <Layout>
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
            path="/project/:projectId/kanban"
            element={isAuthenticated ? <KanbanBoard /> : <Navigate to="/" />}
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
            path="/request-quote"
            element={isAuthenticated ? <QuoteRequest /> : <Navigate to="/" />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
