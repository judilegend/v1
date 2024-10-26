import React from "react";

const TypingIndicator: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div className="flex items-center space-x-2 text-gray-500 text-sm p-2">
      <span>{username} is typing</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
      </div>
    </div>
  );
};

export default TypingIndicator;
