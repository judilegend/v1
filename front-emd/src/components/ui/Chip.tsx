import React from "react";

interface ChipProps {
  label: string;
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
}

const Chip: React.FC<ChipProps> = ({ label, color = "primary" }) => {
  return (
    <div
      className={`MuiChip-root MuiChip-tonal MuiChip-sizeSmall MuiChip-color${color} MuiChip-tonal${color}`}
    >
      <span className="MuiChip-label MuiChip-labelSmall">{label}</span>
    </div>
  );
};

export default Chip;
