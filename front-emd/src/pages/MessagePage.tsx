// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../store";
// import {
//   fetchContacts,
//   fetchConversations,
//   fetchMessagesFromUser,
//   sendDirectMessage,
// } from "../store/slices/directMessageSlice";
// import ConversationList from "../components/messages/ConversationList";
// import MessageContainer from "../components/messages/MessageContainer";
// import SearchUsers from "../components/messages/SearchUsers";
// import { useSocket } from "@/hooks/useSocket";

// const MessagePage: React.FC = () => {
//   const socket = useSocket();
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
//     if (selectedContact && messageContent.trim() && socket) {
//       try {
//         const messageData = {
//           receiverId: selectedContact,
//           content: messageContent.trim(),
//         };

//         // Emit to socket first
//         socket.emit("privateMessage", messageData);

//         // Then dispatch to Redux
//         const result = await dispatch(sendDirectMessage(messageData)).unwrap();

//         if (result) {
//           setMessageContent("");
//         }
//       } catch (error) {
//         console.error("Failed to send message:", error);
//       }
//     }
//   };

//   const handleTyping = (isTyping: boolean) => {
//     if (socket && selectedContact) {
//       socket.emit("typing", {
//         receiverId: selectedContact,
//         isTyping,
//       });
//     }
//   };

//   return (
//     <div className="flex h-[600px] bg-gray-100">
//       <div className="flex flex-col w-1/3 border-r bg-white">
//         <SearchUsers onSelectContact={setSelectedContact} />
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
//           setMessageContent={(content) => {
//             setMessageContent(content);
//             handleTyping(content.length > 0);
//           }}
//           onSendMessage={handleSendMessage}
//           messageListRef={messageListRef}
//         />
//       </div>
//     </div>
//   );
// };

// export default MessagePage;import React, { useEffect, useRef, useState } from "react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  fetchContacts,
  fetchConversations,
  fetchMessagesFromUser,
  sendDirectMessage,
  updateUnreadCount,
  addNewMessage,
} from "../store/slices/directMessageSlice";
import ConversationList from "../components/messages/ConversationList";
import MessageContainer from "../components/messages/MessageContainer";
import SearchUsers from "../components/messages/SearchUsers";
import MessageHeader from "../components/messages/MessageHeader";
import { useSocket } from "@/hooks/useSocket";

interface Contact {
  id: number;
  name: string;
  email: string;
  is_online: boolean;
}

const MessagePage: React.FC = () => {
  const socket = useSocket();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);

  const {
    contacts = [],
    conversations = [],
    currentConversation = [],
  } = useSelector((state: RootState) => state.directMessage);
  const { user } = useSelector((state: RootState) => state.auth);

  // Initial contacts fetch
  useEffect(() => {
    dispatch(fetchContacts());
    console.log("Fetching contacts...");
  }, [dispatch]);

  // Add this to check the contacts in the render
  console.log("Current contacts:", contacts);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: any) => {
      dispatch(addNewMessage(message));
      if (message.senderId !== selectedContact) {
        dispatch(updateUnreadCount({ userId: message.senderId }));
      }
    };

    const handleMessageRead = () => {
      dispatch(fetchConversations());
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messageRead", handleMessageRead);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageRead", handleMessageRead);
    };
  }, [socket, dispatch, selectedContact]);

  // Fetch messages when contact is selected
  useEffect(() => {
    if (selectedContact) {
      dispatch(fetchMessagesFromUser(selectedContact));
      dispatch(fetchConversations());
      socket?.emit("markAsRead", { senderId: selectedContact });
    }
  }, [selectedContact, dispatch, socket]);

  const handleSendMessage = async () => {
    if (!selectedContact || !messageContent.trim() || !socket || !user?.id)
      return;

    const messageData = {
      receiverId: selectedContact,
      content: messageContent.trim(),
      senderId: user.id,
    };

    try {
      socket.emit("privateMessage", messageData);
      await dispatch(sendDirectMessage(messageData)).unwrap();
      setMessageContent("");

      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const onlineUsers = contacts.filter((contact: Contact) => contact.is_online);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-1/3 border-r bg-white">
          <SearchUsers onSelectContact={setSelectedContact} />
          <ConversationList
            contacts={contacts}
            conversations={conversations}
            selectedContact={selectedContact}
            onSelectContact={setSelectedContact}
          />
          <div className="p-4 border-t">
            <h3 className="text-sm font-semibold text-gray-500">
              Online Users ({onlineUsers.length})
            </h3>
            <div className="mt-2 space-y-2">
              {onlineUsers.map((contact: Contact) => (
                <div
                  key={contact.id}
                  className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded"
                  onClick={() => setSelectedContact(contact.id.toString())}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="truncate">{contact.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <MessageHeader
            contactId={selectedContact}
            onlineUsers={onlineUsers.map((c) => c.id)}
          />
          {selectedContact ? (
            <MessageContainer
              messages={currentConversation}
              messageContent={messageContent}
              setMessageContent={setMessageContent}
              onSendMessage={handleSendMessage}
              messageListRef={messageListRef}
              currentUserId={user?.id}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a contact to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
