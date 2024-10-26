import React, { memo } from "react";
import { formatTime } from "../../utils/dateUtils";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isSender: boolean;
  isRead: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = memo(
  ({ content, timestamp, isSender, isRead }) => {
    return (
      <div
        className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`max-w-[70%] rounded-lg p-3 ${
            isSender
              ? "bg-blue-500 text-white ml-auto"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{content}</p>
          <div className="flex items-center justify-end mt-1 space-x-1">
            <span className="text-xs opacity-70">{formatTime(timestamp)}</span>
            {isSender && <span className="text-xs">{isRead ? "✓✓" : "✓"}</span>}
          </div>
        </div>
      </div>
    );
  }
);

export default MessageBubble;
