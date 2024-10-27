import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Contact {
  id: number;
  name: string;
  email: string;
  is_online: boolean;
}

interface ConversationListProps {
  selectedContact: string | null;
  onSelectContact: (contactId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  selectedContact,
  onSelectContact,
}) => {
  const { contacts = [] } = useSelector(
    (state: RootState) => state.directMessage
  );

  if (contacts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500">No contacts available</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={`flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer
            ${selectedContact === contact.id.toString() ? "bg-blue-50" : ""}
          `}
          onClick={() => onSelectContact(contact.id.toString())}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              {contact.name[0].toUpperCase()}
            </div>
            <div
              className={`absolute -right-1 -bottom-1 w-3 h-3 rounded-full border-2 border-white
                ${contact.is_online ? "bg-green-500" : "bg-gray-400"}
              `}
            />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold">{contact.name}</h3>
            <p className="text-sm text-gray-500">{contact.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
