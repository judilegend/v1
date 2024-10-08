import React from "react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";

interface SidebarItemProps {
  path: string;
  label: string;
  icon: IconType;
  isActive: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  path,
  label,
  icon: Icon,
  isActive,
}) => (
  <li>
    <Link
      to={path}
      className={`flex items-center py-2 px-4 rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-primary-100 text-primary-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon
        className={`mr-3 ${isActive ? "text-primary-500" : "text-gray-400"}`}
      />
      <span className="font-medium">{label}</span>
    </Link>
  </li>
);
