import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as directMessageService from "../../services/directMessageService";

interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  read: boolean;
  isSender?: boolean;
}

interface Contact {
  id: number;
  username: string;
  email: string;
  is_online: boolean;
  lastMessage?: Message;
  unreadCount: number;
}

interface DirectMessageState {
  contacts: Contact[];
  conversations: any[];
  currentConversation: Message[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedContact: string | null;
  typingUsers: Record<string, boolean>;
}

const initialState: DirectMessageState = {
  contacts: [],
  conversations: [],
  currentConversation: [],
  status: "idle",
  error: null,
  selectedContact: null,
  typingUsers: {},
};

export const fetchContacts = createAsyncThunk(
  "directMessage/fetchContacts",
  async () => {
    const response = await directMessageService.getContactList();
    return response;
  }
);

export const sendDirectMessage = createAsyncThunk(
  "directMessage/sendMessage",
  async ({ receiverId, content }: { receiverId: string; content: string }) => {
    const response = await directMessageService.sendMessage(
      receiverId,
      content
    );
    return response;
  }
);

export const fetchConversations = createAsyncThunk(
  "directMessage/fetchConversations",
  async () => {
    const response = await directMessageService.getConversations();
    return response;
  }
);

export const fetchMessagesFromUser = createAsyncThunk(
  "directMessage/fetchMessagesFromUser",
  async (userId: string) => {
    const response = await directMessageService.getMessagesFromUser(userId);
    return response;
  }
);

const directMessageSlice = createSlice({
  name: "directMessage",
  initialState,
  reducers: {
    setSelectedContact: (state, action: PayloadAction<string>) => {
      state.selectedContact = action.payload;
    },
    addNewMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      state.currentConversation.push(message);

      const contactId = message.senderId.toString();
      const contact = state.contacts.find((c) => c.id.toString() === contactId);

      if (contact) {
        contact.lastMessage = message;
        if (!message.isSender) {
          contact.unreadCount = (contact.unreadCount || 0) + 1;
        }
      }
    },
    updateOnlineStatus: (
      state,
      action: PayloadAction<{ userId: string; isOnline: boolean }>
    ) => {
      const { userId, isOnline } = action.payload;
      const contact = state.contacts.find((c) => c.id.toString() === userId);
      if (contact) {
        contact.is_online = isOnline;
      }
    },
    updateTypingStatus: (
      state,
      action: PayloadAction<{ userId: string; isTyping: boolean }>
    ) => {
      state.typingUsers[action.payload.userId] = action.payload.isTyping;
    },
    updateMessageReadStatus: (
      state,
      action: PayloadAction<{ senderId: string; receiverId: string }>
    ) => {
      state.currentConversation = state.currentConversation.map((message) =>
        message.senderId.toString() === action.payload.senderId &&
        message.receiverId.toString() === action.payload.receiverId
          ? { ...message, read: true }
          : message
      );
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload.contacts;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchMessagesFromUser.fulfilled, (state, action) => {
        state.currentConversation = action.payload.messages;
      })
      .addCase(sendDirectMessage.fulfilled, (state, action) => {
        state.currentConversation.push(action.payload);
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload.conversations;
      });
  },
});

export const {
  setSelectedContact,
  addNewMessage,
  updateOnlineStatus,
  updateTypingStatus,
  updateMessageReadStatus,
  clearCurrentConversation,
} = directMessageSlice.actions;

export default directMessageSlice.reducer;
