import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as messageService from "../../services/directMessageService";
import { Message, Conversation } from "../../types/types";

interface MessagingState {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  unreadCount: number;
}

const initialState: MessagingState = {
  conversations: [],
  activeConversation: null,
  messages: [],
  loading: false,
  error: null,
  unreadCount: 0,
};

export const fetchConversations = createAsyncThunk(
  "messaging/fetchConversations",
  async () => {
    const response = await messageService.getConversations();
    return response.data;
  }
);

export const fetchMessages = createAsyncThunk(
  "messaging/fetchMessages",
  async (conversationId: string) => {
    const response = await messageService.getMessagesFromUser(conversationId);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  "messaging/sendMessage",
  async ({ receiverId, content }: { receiverId: string; content: string }) => {
    const response = await messageService.sendMessage(receiverId, content);
    return response.data;
  }
);

const messagingSlice = createSlice({
  name: "messaging",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { setActiveConversation, addMessage, updateUnreadCount } =
  messagingSlice.actions;
export default messagingSlice.reducer;
