import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addNewMessage,
  updateOnlineStatus,
  updateTypingStatus,
  updateMessageReadStatus,
} from "../store/slices/directMessageSlice";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { selectedContact } = useSelector(
    (state: RootState) => state.directMessage
  );

  useEffect(() => {
    if (token && !socketRef.current) {
      socketRef.current = io("http://localhost:5000", {
        auth: { token },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected");
      });

      socketRef.current.on("newMessage", (message) => {
        dispatch(addNewMessage(message));
      });

      socketRef.current.on("messageRead", (data) => {
        dispatch(updateMessageReadStatus(data));
      });

      socketRef.current.on("userStatus", ({ userId, isOnline }) => {
        dispatch(updateOnlineStatus({ userId, isOnline }));
      });

      socketRef.current.on("userTyping", ({ userId, isTyping }) => {
        dispatch(updateTypingStatus({ userId, isTyping }));
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token, dispatch]);

  return socketRef.current;
};
