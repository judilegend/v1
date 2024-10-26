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
import { useSocket } from "@/hooks/useSocket";

// const MessagePage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [selectedContact, setSelectedContact] = useState<string | null>(null);
//   const [messageContent, setMessageContent] = useState("");
//   const messageListRef = useRef<HTMLDivElement>(null);

//   const { conversations, currentConversation } = useSelector(
//     (state: RootState) => state.directMessage
//   );

//   useEffect(() => {
//     dispatch(fetchConversations());
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   useEffect(() => {
//     if (selectedContact) {
//       dispatch(fetchMessagesFromUser(selectedContact));
//     }
//   }, [selectedContact, dispatch]);

//   const handleSendMessage = async () => {
//     if (selectedContact && messageContent.trim()) {
//       await dispatch(
//         sendDirectMessage({
//           receiverId: selectedContact,
//           content: messageContent,
//         })
//       );
//       setMessageContent("");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="flex flex-col w-1/3 border-r bg-white">
//         <SearchUsers />
//         <ConversationList
//           conversations={conversations}
//           selectedContact={selectedContact}
//           onSelectContact={setSelectedContact}
//         />
//       </div>

//       <div className="flex-1">
//         <MessageContainer
//           messages={currentConversation}
//           messageContent={messageContent}
//           setMessageContent={setMessageContent}
//           onSendMessage={handleSendMessage}
//           messageListRef={messageListRef}
//         />
//       </div>
//     </div>
//   );
// };
const MessagePage: React.FC = () => {
  const socket = useSocket();
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
    if (selectedContact && messageContent.trim() && socket) {
      try {
        const messageData = {
          receiverId: selectedContact,
          content: messageContent.trim(),
        };

        // Emit to socket first
        socket.emit("privateMessage", messageData);

        // Then dispatch to Redux
        const result = await dispatch(sendDirectMessage(messageData)).unwrap();

        if (result) {
          setMessageContent("");
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleTyping = (isTyping: boolean) => {
    if (socket && selectedContact) {
      socket.emit("typing", {
        receiverId: selectedContact,
        isTyping,
      });
    }
  };

  return (
    <div className="flex h-[600px] bg-gray-100">
      <div className="flex flex-col w-1/3 border-r bg-white">
        <SearchUsers onSelectContact={setSelectedContact} />
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
          setMessageContent={(content) => {
            setMessageContent(content);
            handleTyping(content.length > 0);
          }}
          onSendMessage={handleSendMessage}
          messageListRef={messageListRef}
        />
      </div>
    </div>
  );
};

export default MessagePage;
