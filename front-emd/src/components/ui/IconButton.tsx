import React from "react";

interface IconButtonProps {
  icon: string;
  onClick?: () => void;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall ${className}`}
      onClick={onClick}
    >
      <i className={`tabler-${icon}`}></i>
    </button>
  );
};

export default IconButton;
