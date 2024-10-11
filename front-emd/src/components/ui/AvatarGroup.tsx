import React from "react";
import Avatar from "./Avatar";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AvatarGroupProps {
  users?: User[];
  max?: number;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [], max = 4 }) => {
  const visibleUsers = users.slice(0, max);
  const remainingUsers = users.length - max;

  return (
    <div className="MuiAvatarGroup-root pull-up">
      {visibleUsers.map((user) => (
        <Avatar key={user.id} src={user.avatar} alt={user.name} />
      ))}
      {remainingUsers > 0 && (
        <div className="MuiAvatar-root MuiAvatar-circular MuiAvatarGroup-avatar cursor-pointer">
          +{remainingUsers}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
