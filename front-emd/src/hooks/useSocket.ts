// import { useEffect, useRef } from "react";
// import { io, Socket } from "socket.io-client";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";

// export const useSocket = () => {
//   const socketRef = useRef<Socket | null>(null);
//   const { token } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     if (token && !socketRef.current) {
//       socketRef.current = io(
//         process.env.REACT_APP_SOCKET_URL || "http://localhost:5000",
//         {
//           auth: { token },
//         }
//       );

//       socketRef.current.on("connect_error", (error) => {
//         console.error("Socket connection error:", error);
//       });
//     }

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current = null;
//       }
//     };
//   }, [token]);

//   return socketRef.current;
// };
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addNewMessage,
  updateMessageReadStatus,
} from "../store/slices/directMessageSlice";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  //   const { selectedContact } = useSelector(
  //     (state: RootState) => state.directMessage
  //   );

  useEffect(() => {
    if (token && !socketRef.current) {
      socketRef.current = io(
        process.env.REACT_APP_SOCKET_URL || "http://localhost:5000",
        {
          auth: { token },
        }
      );

      socketRef.current.on("new_message", (message: unknown) => {
        dispatch(addNewMessage(message));
      });

      socketRef.current.on("message_read", (data: unknown) => {
        dispatch(updateMessageReadStatus(data));
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
