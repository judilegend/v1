import React, { useState } from "react";

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}

interface MessageAreaProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  selectedContact: string | null;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  onSendMessage,
  selectedContact,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() && selectedContact) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <p>{message.content}</p>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-100">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageArea;
