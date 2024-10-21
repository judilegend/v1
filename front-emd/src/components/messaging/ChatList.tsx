import React from "react";

interface Contact {
  id: string;
  name: string;
}

interface ChatListProps {
  contacts: Contact[];
  onSelectContact: (contactId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ contacts, onSelectContact }) => {
  return (
    <div className="w-1/4 bg-gray-100 overflow-y-auto">
      <h2 className="text-xl font-bold p-4">Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="p-4 hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelectContact(contact.id)}
          >
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
