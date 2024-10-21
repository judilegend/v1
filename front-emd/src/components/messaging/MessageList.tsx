import React from "react";
import { Message } from "../../types/Messaging";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages &&
        messages.map(
          (message) =>
            message &&
            message.sender && (
              <div key={message.id} className="flex flex-col">
                <div className="font-medium">{message.sender}</div>
                <div className="bg-white p-2 rounded-lg shadow">
                  <p>{message.content}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleString()}
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default MessageList;
