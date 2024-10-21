import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as messageService from "../../services/messageService";

interface Message {
  id: string;
  roomId: string;
  content: string;
  sender: string;
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchMessages = createAsyncThunk<Message[], string>(
  "chat/fetchMessages",
  async (roomId: string) => {
    const response = await messageService.getMessages(roomId);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk<
  Message,
  { roomId: string; content: string; sender: string }
>("chat/sendMessage", async (messageData, { rejectWithValue }) => {
  try {
    const response = await messageService.sendMessage(messageData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

export const fetchDirectMessages = createAsyncThunk<
  Message[],
  { senderId: string; receiverId: string }
>("chat/fetchMessageDirect", async ({ senderId, receiverId }) => {
  const response = await messageService.getDirectMessages(senderId, receiverId);
  return response.data;
});

export const sendDirectMessage = createAsyncThunk<
  Message,
  { senderId: string; receiverId: string; content: string }
>("chat/sendDirect", async (messageData) => {
  const response = await messageService.sendDirectMessage(messageData);
  return response.data;
});

const initialState: ChatState = {
  messages: [],
  status: "idle",
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(fetchDirectMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(sendDirectMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
