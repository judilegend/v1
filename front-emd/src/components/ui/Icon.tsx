import React from "react";

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => (
  <span className={`material-icons ${className}`}>{name}</span>
);
