import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "danger" | "accent";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className,
  ...props
}) => {
  const baseClasses =
    "py-2 px-4 rounded-lg font-semibold transition-colors duration-200";
  const variantClasses = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white",
    secondary: "bg-secondary-100 hover:bg-secondary-200 text-secondary-700",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    accent: "bg-accent-500 hover:bg-accent-600 text-white",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
