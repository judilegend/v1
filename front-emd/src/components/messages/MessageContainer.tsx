import React from "react";
import { formatTime, formatDate } from "../../utils/dateUtils";

interface MessageContainerProps {
  messages: any[];
  messageContent: string;
  setMessageContent: (content: string) => void;
  onSendMessage: () => void;
  messageListRef: React.RefObject<HTMLDivElement>;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messages,
  messageContent,
  setMessageContent,
  onSendMessage,
  messageListRef,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={messageListRef} className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <React.Fragment key={message.id}>
            {(index === 0 ||
              formatDate(message.createdAt) !==
                formatDate(messages[index - 1].createdAt)) && (
              <div className="text-center text-gray-500 text-sm my-4">
                {formatDate(message.createdAt)}
              </div>
            )}
            <div
              className={`flex ${
                message.isSender ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isSender ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70">
                  {formatTime(message.createdAt)}
                </span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex items-center">
          <textarea
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            rows={3}
          />
          <button
            onClick={onSendMessage}
            disabled={!messageContent.trim()}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
