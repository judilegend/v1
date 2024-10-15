import React from "react";
import { Message } from "../../types/Messaging";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col">
          <div className="font-medium">{message.sender}</div>
          <div className="bg-white p-2 rounded-lg shadow">
            <p>{message.content}</p>
            {message.attachments.map((attachment, index) => (
              <div key={index} className="mt-2">
                {attachment.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(attachment)}
                    alt="attachment"
                    className="max-w-xs rounded"
                  />
                ) : (
                  <a
                    href={URL.createObjectURL(attachment)}
                    download
                    className="text-blue-500 hover:underline"
                  >
                    {attachment.name}
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {message.timestamp.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
