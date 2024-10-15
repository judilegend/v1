import React, { useState } from "react";
import { Chat, Message } from "../../types/Messaging";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface MessageAreaProps {
  selectedChat: Chat | null;
}

const MessageArea: React.FC<MessageAreaProps> = ({ selectedChat }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (content: string, attachments: File[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Current User",
      content,
      timestamp: new Date(),
      attachments,
    };
    setMessages([...messages, newMessage]);
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white p-4 border-b">
        <h2 className="text-xl font-semibold">{selectedChat.name}</h2>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default MessageArea;
