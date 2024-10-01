import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AuthForm from "./components/AuthForm";
import Dashboard from "./pages/Dashboard";
import { RootState } from "./store";
import Message from "./pages/Project";
import Chat from "./pages/Chat";
import Messagerie from "./pages/Messagerie";
const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  // const { user } = useSelector((state: RootState) => state.auth);
  // useEffect(() => {
  //   console.log(user);
  // });
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 ">
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
            path="/messages"
            element={isAuthenticated ? <Message /> : <Navigate to="/" />}
          />
          <Route
            path="/chat"
            element={isAuthenticated ? <Chat /> : <Navigate to="/" />}
          />
          <Route
            path="/messagerie"
            element={isAuthenticated ? <Messagerie /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
