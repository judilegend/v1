import React, { useState, useRef } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";

interface MessageInputProps {
  onSendMessage: (content: string, attachments: File[]) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage("");
      setAttachments([]);
    }
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="bg-white p-4 border-t flex items-center space-x-2">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="text-gray-500 hover:text-gray-700"
      >
        <FaPaperclip />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAttachment}
        multiple
        className="hidden"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default MessageInput;
