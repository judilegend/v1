import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/login");
  };

  return (
    <div className="ml-3 relative" ref={menuRef}>
      <div>
        <button
          className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="text-gray-500" />
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 text-sm text-gray-700">
            <div className="font-medium">Default User</div>
            <div className="text-gray-400">user@example.com</div>
          </div>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              navigate("/profile");
            }}
          >
            Your Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              navigate("/settings");
            }}
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Sign out
          </a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
