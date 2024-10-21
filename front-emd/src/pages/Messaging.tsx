import React, { useState } from "react";
import ChatList from "../components/messaging/ChatList";
import MessageArea from "../components/messaging/MessageArea";
import { Chat } from "../types/Messaging";

const Messaging: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatList onSelectChat={setSelectedChat} />
      <MessageArea selectedChat={selectedChat} />
    </div>
  );
};

export default Messaging;
