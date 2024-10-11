import React from "react";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 26 }) => {
  return (
    <div
      className="MuiAvatar-root MuiAvatar-circular cursor-pointer"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={alt} className="MuiAvatar-img" />
      ) : (
        <div className="MuiAvatar-img">{alt.charAt(0).toUpperCase()}</div>
      )}
    </div>
  );
};

export default Avatar;
