import io from "socket.io-client";

const socket = io("http://localhost:5000");

export const joinRoom = (roomId: string) => {
  socket.emit("join_room", roomId);
};

export const leaveRoom = (roomId: string) => {
  socket.emit("leave_room", roomId);
};

export const sendMessage = (data: any) => {
  socket.emit("send_message", data);
};

export const onReceiveMessage = (callback: (data: any) => void) => {
  socket.on("receive_message", callback);
};

export default socket;
