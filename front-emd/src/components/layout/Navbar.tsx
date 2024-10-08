import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import UserMenu from "./UserMenu";

const Navbar: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentPage = pathSegments[0]
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
    : "Dashboard";

  return (
    <nav className="bg-white max-w-8xl  shadow-lg">
      <div className=" mx-auto px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-500">
              {currentPage}
            </h1>
          </div>
          <div className="flex items-center">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <FiBell className="h-6 w-6" />
            </button>
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
