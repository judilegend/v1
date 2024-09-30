import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    navigate("/");
  };
  const { user } = useSelector((state: RootState) => state.auth);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    {
      path: "/messages",
      label: "New project",
      icon: "✉️",
      hideForRoles: ["user"],
    },
    { path: "/messagerie", label: "Couriel", icon: "✉️" },
    { path: "/chat", label: "Chat", icon: "💬" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Project Manager</h1>
      </div>
      <nav>
        <ul>
          {menuItems.map(
            (item) =>
              (!item.hideForRoles ||
                !user ||
                !item.hideForRoles.includes(user.role)) && (
                <li key={item.path} className="mb-4">
                  <Link
                    to={item.path}
                    className={`flex items-center py-2 px-4 rounded transition-colors duration-200 ${
                      isActive(item.path)
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              )
          )}
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="w-full p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
