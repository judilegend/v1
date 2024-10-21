import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./ChatList";
import MessageArea from "./MessageArea";
import {
  fetchContacts,
  fetchConversations,
  fetchMessagesFromUser,
  sendDirectMessage,
} from "../../store/slices/directMessageSlice";
import { AppDispatch, RootState } from "../../store";

const Messaging: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, conversations, currentConversation } = useSelector(
    (state: RootState) => state.directMessage
  );
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchConversations());
  }, [dispatch]);

  const handleContactSelect = (contactId: string) => {
    setSelectedContact(contactId);
    dispatch(fetchMessagesFromUser(contactId));
  };

  const handleSendMessage = (content: string) => {
    if (selectedContact) {
      dispatch(sendDirectMessage({ receiverId: selectedContact, content }));
    }
  };

  return (
    <div className="flex h-screen">
      <ChatList contacts={contacts} onSelectContact={handleContactSelect} />
      <MessageArea
        messages={currentConversation}
        onSendMessage={handleSendMessage}
        selectedContact={selectedContact}
      />
    </div>
  );
};

export default Messaging;
