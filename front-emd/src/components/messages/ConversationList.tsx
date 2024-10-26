import React from "react";
import { formatTime } from "../../utils/dateUtils";

interface ConversationListProps {
  conversations: any[];
  selectedContact: string | null;
  onSelectContact: (contactId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedContact,
  onSelectContact,
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer ${
            selectedContact === conversation.id ? "bg-blue-50" : ""
          }`}
          onClick={() => onSelectContact(conversation.id)}
        >
          <div className="flex-1">
            <h3 className="font-semibold">{conversation.name}</h3>
            <p className="text-sm text-gray-500 truncate">
              {conversation.lastMessage?.content}
            </p>
          </div>
          <div className="text-xs text-gray-400">
            {conversation.lastMessage &&
              formatTime(conversation.lastMessage.createdAt)}
          </div>
          {conversation.unreadCount > 0 && (
            <div className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
              {conversation.unreadCount}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
