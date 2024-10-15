import React from "react";
import { Chat } from "../../types/Messaging";

interface ChatListProps {
  onSelectChat: (chat: Chat) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat }) => {
  const chats: Chat[] = [
    { id: "1", name: "John Doe", type: "direct" },
    { id: "2", name: "Project A Room", type: "room" },
    // Add more mock data as needed
  ];

  return (
    <div className="w-1/4 bg-white border-r">
      <h2 className="text-xl font-semibold p-4 border-b">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="p-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectChat(chat)}
          >
            <div className="font-medium">{chat.name}</div>
            <div className="text-sm text-gray-500">
              {chat.type === "direct" ? "Direct Message" : "Room"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
