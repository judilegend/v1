import { Socket } from "dgram";

export const emitTypingStatus = (
  socket: Socket,
  receiverId: string,
  isTyping: boolean
) => {
  socket.emit("typing", { receiverId, isTyping });
};

export const emitMessageRead = (socket: Socket, messageId: string) => {
  socket.emit("messageRead", { messageId });
};

export const joinConversation = (socket: Socket, conversationId: string) => {
  socket.emit("joinConversation", { conversationId });
};
