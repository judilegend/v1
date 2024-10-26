import React from "react";
import { formatTime } from "../../utils/dateUtils";

interface Message {
  id: number;
  content: string;
  createdAt: string | Date;
}

interface Conversation {
  id: number;
  name: string;
  is_online: boolean;
  lastMessage?: Message;
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedContact: string | null;
  onSelectContact: (contactId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedContact,
  onSelectContact,
}) => {
  const renderLastMessageTime = (lastMessage?: Message) => {
    if (!lastMessage?.createdAt) return null;
    const formattedTime = formatTime(lastMessage.createdAt);
    return formattedTime ? (
      <div className="text-xs text-gray-400">{formattedTime}</div>
    ) : null;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer ${
            selectedContact === conversation.id.toString() ? "bg-blue-50" : ""
          }`}
          onClick={() => onSelectContact(conversation.id.toString())}
        >
          <div className="relative">
            <div
              className={`w-2 h-2 absolute right-0 bottom-0 rounded-full ${
                conversation.is_online ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
          <div className="flex-1 ml-3">
            <h3 className="font-semibold">{conversation.name}</h3>
            <p className="text-sm text-gray-500 truncate">
              {conversation.lastMessage?.content}
            </p>
          </div>
          {renderLastMessageTime(conversation.lastMessage)}
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
