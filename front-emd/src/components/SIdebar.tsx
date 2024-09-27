import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/messages", label: "New project", icon: "✉️" },
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
          {menuItems.map((item) => (
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
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-8">
        <button className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
