import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as directMessageService from "../../services/directMessageService";

export const fetchContacts = createAsyncThunk(
  "directMessage/fetchContacts",
  directMessageService.getContactList
);
export const sendDirectMessage = createAsyncThunk(
  "directMessage/sendMessage",
  ({ receiverId, content }: { receiverId: string; content: string }) =>
    directMessageService.sendMessage(receiverId, content)
);
export const fetchConversations = createAsyncThunk(
  "directMessage/fetchConversations",
  directMessageService.getConversations
);
export const fetchMessagesFromUser = createAsyncThunk(
  "directMessage/fetchMessagesFromUser",
  (userId: string) => directMessageService.getMessagesFromUser(userId)
);

const directMessageSlice = createSlice({
  name: "directMessage",
  initialState: {
    contacts: [],
    conversations: [],
    currentConversation: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload.data;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
      })
      .addCase(fetchMessagesFromUser.fulfilled, (state, action) => {
        state.currentConversation = action.payload.data;
      })
      .addCase(sendDirectMessage.fulfilled, (state, action) => {
        state.currentConversation = [...state.currentConversation, action.payload.data as never];
      });
  }
});

export default directMessageSlice.reducer;
