import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import debounce from "lodash/debounce";
import { getContactList } from "../../services/directMessageService";

interface SearchUsersProps {
  onSelectUser?: (user: any) => void;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  isOnline: boolean;
}

const SearchUsers: React.FC<SearchUsersProps> = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Contact[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (term.trim()) {
        try {
          setIsSearching(true);
          const response = await getContactList();
          // Filter contacts based on search term
          const filteredContacts = response.contacts.filter(
            (contact: Contact) =>
              contact.name.toLowerCase().includes(term.toLowerCase()) ||
              contact.email.toLowerCase().includes(term.toLowerCase())
          );
          setSearchResults(filteredContacts);
        } catch (error) {
          console.error("Error searching users:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(true);
    debouncedSearch(value);
  };

  return (
    <div className="p-4 border-b">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isSearching && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
          </div>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((user: Contact) => (
            <div
              key={user.id}
              onClick={() => onSelectUser?.(user)}
              className="p-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="text-xs text-gray-400">
                {user.isOnline ? "Online" : "Offline"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUsers;
