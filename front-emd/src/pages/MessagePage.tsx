import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  fetchContacts,
  fetchConversations,
  fetchMessagesFromUser,
  sendDirectMessage,
} from "../store/slices/directMessageSlice";
import ConversationList from "../components/messages/ConversationList";
import MessageContainer from "../components/messages/MessageContainer";
import SearchUsers from "../components/messages/SearchUsers";

const MessagePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);

  const { conversations, currentConversation } = useSelector(
    (state: RootState) => state.directMessage
  );

  useEffect(() => {
    dispatch(fetchConversations());
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedContact) {
      dispatch(fetchMessagesFromUser(selectedContact));
    }
  }, [selectedContact, dispatch]);

  const handleSendMessage = async () => {
    if (selectedContact && messageContent.trim()) {
      await dispatch(
        sendDirectMessage({
          receiverId: selectedContact,
          content: messageContent,
        })
      );
      setMessageContent("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-1/3 border-r bg-white">
        <SearchUsers />
        <ConversationList
          conversations={conversations}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
        />
      </div>

      <div className="flex-1">
        <MessageContainer
          messages={currentConversation}
          messageContent={messageContent}
          setMessageContent={setMessageContent}
          onSendMessage={handleSendMessage}
          messageListRef={messageListRef}
        />
      </div>
    </div>
  );
};

export default MessagePage;
