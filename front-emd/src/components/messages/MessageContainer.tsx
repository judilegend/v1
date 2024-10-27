import React, { useEffect } from "react";
import { formatTime, formatDate } from "../../utils/dateUtils";

interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string | Date;
  read: boolean;
}

interface MessageContainerProps {
  messages: Message[];
  messageContent: string;
  setMessageContent: (content: string) => void;
  onSendMessage: () => void;
  messageListRef: React.RefObject<HTMLDivElement>;
  currentUserId: string;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  messages = [],
  messageContent,
  setMessageContent,
  onSendMessage,
  messageListRef,
  currentUserId,
}) => {
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Start a conversation
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div ref={messageListRef} className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => {
          const isSender = message.senderId === Number(currentUserId);
          const showDate =
            index === 0 ||
            formatDate(message.createdAt) !==
              formatDate(messages[index - 1].createdAt);

          return (
            <React.Fragment key={message.id}>
              {showDate && (
                <div className="flex justify-center my-4">
                  <div className="px-4 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
                    {formatDate(message.createdAt)}
                  </div>
                </div>
              )}
              <div
                className={`flex ${
                  isSender ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isSender ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <div className="flex items-center justify-end mt-1 space-x-2">
                    <span className="text-xs opacity-70">
                      {formatTime(message.createdAt)}
                    </span>
                    {isSender && (
                      <span className="text-xs">
                        {message.read ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="border-t p-4 bg-gray-50">
        <div className="flex items-center space-x-2">
          <textarea
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[50px] max-h-[150px]"
            placeholder="Type a message..."
            rows={1}
          />
          <button
            onClick={onSendMessage}
            disabled={!messageContent.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
