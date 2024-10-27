import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addNewMessage,
  updateOnlineStatus,
  updateUnreadCount,
} from "../store/slices/directMessageSlice";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

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

      socketRef.current.on("messageRead", ({ senderId }) => {
        dispatch(updateUnreadCount({ userId: senderId }));
      });

      socketRef.current.on("userStatus", ({ userId, isOnline }) => {
        dispatch(updateOnlineStatus({ userId, isOnline }));
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
