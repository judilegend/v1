import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { logoutUser } from "../store/authSlice";
import { SidebarItem } from "./layout/SidebarItem";
import { Button } from "./ui/Button";
import { FiLogOut, FiPlus } from "react-icons/fi";
import {
  MdDashboard,
  MdFolder,
  MdViewKanban,
  MdTimer,
  MdChat,
  MdEmail,
  MdSettings,
  MdRequestQuote,
} from "react-icons/md";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    // dispatch(logoutUser());
    navigate("/");
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: MdDashboard },
    { path: "/projects", label: "Projects", icon: MdFolder },
    { path: "/kanban", label: "Kanban", icon: MdViewKanban },
    { path: "/sprints", label: "Sprints", icon: MdTimer },
    { path: "/messages", label: "Messages", icon: MdChat },
    { path: "/email", label: "Email", icon: MdEmail },
    { path: "/settings", label: "Settings", icon: MdSettings },
  ];

  return (
    <aside className="bg-white text-gray-800 w-64 min-h-screen p-4 flex flex-col shadow-smooth">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-600">Project Manager</h1>
      </div>
      <div className="mb-6 px-2">
        <Button
          variant="accent"
          className="w-full flex items-center justify-center "
          onClick={() => navigate("/request-quote")}
        >
          <FiPlus className="mr-2" />
          Demander devis
        </Button>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              isActive={location.pathname === item.path}
            />
          ))}
        </ul>
      </nav>
      {/* <div className="mt-auto px-2">
        <Button
          variant="danger"
          className="w-full flex items-center justify-center "
          onClick={handleLogout}
        >
          <FiLogOut className="mr-2" />
          Logout
        </Button>
      </div> */}
    </aside>
  );
};

export default Sidebar;
