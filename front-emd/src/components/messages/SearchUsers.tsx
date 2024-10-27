import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface SearchUsersProps {
  onSelectContact: (contactId: string | null) => void;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  is_online: boolean;
}

const SearchUsers: React.FC<SearchUsersProps> = ({ onSelectContact }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { contacts = [] } = useSelector(
    (state: RootState) => state.directMessage
  );

  const getFilteredContacts = useCallback(() => {
    if (!searchTerm) return [];
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 300);
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className="p-4 border-b relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search contacts..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isSearching && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
          </div>
        )}
      </div>

      {searchTerm && filteredContacts.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                onSelectContact(contact.id.toString());
                setSearchTerm("");
              }}
            >
              <div className="font-medium">{contact.name}</div>
              <div className="text-sm text-gray-500">{contact.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUsers;
