// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as directMessageService from "../../services/directMessageService";

// export const fetchContacts = createAsyncThunk(
//   "directMessage/fetchContacts",
//   directMessageService.getContactList
// );
// export const sendDirectMessage = createAsyncThunk(
//   "directMessage/sendMessage",
//   ({ receiverId, content }: { receiverId: string; content: string }) =>
//     directMessageService.sendMessage(receiverId, content)
// );
// export const fetchConversations = createAsyncThunk(
//   "directMessage/fetchConversations",
//   directMessageService.getConversations
// );
// export const fetchMessagesFromUser = createAsyncThunk(
//   "directMessage/fetchMessagesFromUser",
//   (userId: string) => directMessageService.getMessagesFromUser(userId)
// );

// const directMessageSlice = createSlice({
//   name: "directMessage",
//   initialState: {
//     contacts: [],
//     conversations: [],
//     currentConversation: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContacts.fulfilled, (state, action) => {
//         state.contacts = action.payload.data;
//       })
//       .addCase(fetchConversations.fulfilled, (state, action) => {
//         state.conversations = action.payload.data;
//       })
//       .addCase(fetchMessagesFromUser.fulfilled, (state, action) => {
//         state.currentConversation = action.payload.data;
//       })
//       .addCase(sendDirectMessage.fulfilled, (state, action) => {
//         state.currentConversation = [...state.currentConversation, action.payload.data as never];
//       });
//   }
// });

// export default directMessageSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as directMessageService from "../../services/directMessageService";

interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  read: boolean;
}

interface DirectMessageState {
  contacts: any[];
  conversations: any[];
  currentConversation: Message[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedContact: string | null;
}

const initialState: DirectMessageState = {
  contacts: [],
  conversations: [],
  currentConversation: [],
  status: "idle",
  error: null,
  selectedContact: null,
};

export const fetchContacts = createAsyncThunk(
  "directMessage/fetchContacts",
  directMessageService.getContactList
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
  directMessageService.getConversations
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
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    addNewMessage: (state, action) => {
      state.currentConversation.push(action.payload);
    },
    updateMessageReadStatus: (state, action) => {
      const { senderId } = action.payload;
      state.currentConversation = state.currentConversation.map((message) =>
        message.senderId === senderId ? { ...message, read: true } : message
      );
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
      });
  },
});

export const { setSelectedContact, addNewMessage, updateMessageReadStatus } =
  directMessageSlice.actions;
export default directMessageSlice.reducer;
