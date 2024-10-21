import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { AppDispatch, RootState } from "../../store";
import { User } from "../../types/types";
import {
  fetchMessages,
  sendMessage,
  addMessage,
} from "../../store/slices/chatSlice";

const socket = io("http://localhost:5000");

export const useMessagingLogic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const messages = useSelector((state: RootState) => state.chat.messages);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (currentUser) {
      socket.emit("join", currentUser.id);

      socket.on("newMessage", (message) => {
        dispatch(addMessage(message));
      });
    }

    return () => {
      socket.off("newMessage");
    };
  }, [dispatch, currentUser]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    if (currentUser && user) {
      dispatch(fetchMessages(`${currentUser.id}_${user.id}`));
    }
  };

  const handleSendMessage = (content: string) => {
    if (currentUser && selectedUser) {
      const messageData = {
        roomId: `${currentUser.id}_${selectedUser.id}`,
        content,
        sender: currentUser.id,
      };
      socket.emit("sendDirectMessage", messageData);
      dispatch(sendMessage(messageData));
    }
  };

  return {
    selectedUser,
    messages,
    currentUser,
    handleUserSelect,
    handleSendMessage,
  };
};
