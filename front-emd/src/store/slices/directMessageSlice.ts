// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// // import * as directMessageService from "../../services/directMessageService";

// // interface Message {
// //   id: number;
// //   content: string;
// //   senderId: number;
// //   receiverId: number;
// //   createdAt: string;
// //   read: boolean;
// //   isSender?: boolean;
// // }

// // interface Contact {
// //   id: number;
// //   username: string;
// //   email: string;
// //   is_online: boolean;
// //   lastMessage?: Message;
// //   unreadCount: number;
// // }

// // interface DirectMessageState {
// //   contacts: Contact[];
// //   conversations: any[];
// //   currentConversation: Message[];
// //   status: "idle" | "loading" | "succeeded" | "failed";
// //   error: string | null;
// //   selectedContact: string | null;
// //   typingUsers: Record<string, boolean>;
// // }

// // const initialState: DirectMessageState = {
// //   contacts: [],
// //   conversations: [],
// //   currentConversation: [],
// //   status: "idle",
// //   error: null,
// //   selectedContact: null,
// //   typingUsers: {},
// // };

// // export const fetchContacts = createAsyncThunk(
// //   "directMessage/fetchContacts",
// //   async () => {
// //     const response = await directMessageService.getContactList();
// //     return response;
// //   }
// // );

// // export const sendDirectMessage = createAsyncThunk(
// //   "directMessage/sendMessage",
// //   async ({ receiverId, content }: { receiverId: string; content: string }) => {
// //     const response = await directMessageService.sendMessage(
// //       receiverId,
// //       content
// //     );
// //     return response;
// //   }
// // );

// // export const fetchConversations = createAsyncThunk(
// //   "directMessage/fetchConversations",
// //   async () => {
// //     const response = await directMessageService.getConversations();
// //     return response;
// //   }
// // );

// // export const fetchMessagesFromUser = createAsyncThunk(
// //   "directMessage/fetchMessagesFromUser",
// //   async (userId: string) => {
// //     const response = await directMessageService.getMessagesFromUser(userId);
// //     return response;
// //   }
// // );

// // const directMessageSlice = createSlice({
// //   name: "directMessage",
// //   initialState,
// //   reducers: {
// //     setSelectedContact: (state, action: PayloadAction<string>) => {
// //       state.selectedContact = action.payload;
// //     },
// //     addNewMessage: (state, action: PayloadAction<Message>) => {
// //       const message = action.payload;
// //       state.currentConversation.push(message);

// //       const contactId = message.senderId.toString();
// //       const contact = state.contacts.find((c) => c.id.toString() === contactId);

// //       if (contact) {
// //         contact.lastMessage = message;
// //         if (!message.isSender) {
// //           contact.unreadCount = (contact.unreadCount || 0) + 1;
// //         }
// //       }
// //     },
// //     updateOnlineStatus: (
// //       state,
// //       action: PayloadAction<{ userId: string; isOnline: boolean }>
// //     ) => {
// //       const { userId, isOnline } = action.payload;
// //       const contact = state.contacts.find((c) => c.id.toString() === userId);
// //       if (contact) {
// //         contact.is_online = isOnline;
// //       }
// //     },
// //     updateTypingStatus: (
// //       state,
// //       action: PayloadAction<{ userId: string; isTyping: boolean }>
// //     ) => {
// //       state.typingUsers[action.payload.userId] = action.payload.isTyping;
// //     },
// //     updateMessageReadStatus: (
// //       state,
// //       action: PayloadAction<{ senderId: string; receiverId: string }>
// //     ) => {
// //       state.currentConversation = state.currentConversation.map((message) =>
// //         message.senderId.toString() === action.payload.senderId &&
// //         message.receiverId.toString() === action.payload.receiverId
// //           ? { ...message, read: true }
// //           : message
// //       );
// //     },
// //     clearCurrentConversation: (state) => {
// //       state.currentConversation = [];
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchContacts.pending, (state) => {
// //         state.status = "loading";
// //       })
// //       .addCase(fetchContacts.fulfilled, (state, action) => {
// //         state.status = "succeeded";
// //         state.contacts = action.payload.contacts;
// //       })
// //       .addCase(fetchContacts.rejected, (state, action) => {
// //         state.status = "failed";
// //         state.error = action.error.message || null;
// //       })
// //       .addCase(fetchMessagesFromUser.fulfilled, (state, action) => {
// //         state.currentConversation = action.payload.messages;
// //       })
// //       .addCase(sendDirectMessage.fulfilled, (state, action) => {
// //         state.currentConversation.push(action.payload);
// //       })
// //       .addCase(fetchConversations.fulfilled, (state, action) => {
// //         state.conversations = action.payload.conversations;
// //       });
// //   },
// // });

// // export const {
// //   setSelectedContact,
// //   addNewMessage,
// //   updateOnlineStatus,
// //   updateTypingStatus,
// //   updateMessageReadStatus,
// //   clearCurrentConversation,
// // } = directMessageSlice.actions;

// // export default directMessageSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as directMessageService from "../../services/directMessageService";

// export const fetchContacts = createAsyncThunk(
//   "directMessage/fetchContacts",
//   async () => {
//     const response = await directMessageService.getContactList();
//     return response.contacts;
//   }
// );

// export const fetchConversations = createAsyncThunk(
//   "directMessage/fetchConversations",
//   async () => {
//     const response = await directMessageService.getConversations();
//     return response.conversations;
//   }
// );

// export const fetchMessagesFromUser = createAsyncThunk(
//   "directMessage/fetchMessagesFromUser",
//   async (userId: string) => {
//     const messages = await directMessageService.getMessagesFromUser(userId);
//     return messages;
//   }
// );

// export const sendDirectMessage = createAsyncThunk(
//   "directMessage/sendMessage",
//   async (messageData: { receiverId: string; content: string }) => {
//     const response = await directMessageService.sendMessage(
//       messageData.receiverId,
//       messageData.content
//     );
//     return response;
//   }
// );

// const directMessageSlice = createSlice({
//   name: "directMessage",
//   initialState: {
//     contacts: [],
//     conversations: [],
//     currentConversation: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     addNewMessage: (state, action) => {
//       state.currentConversation.push(action.payload);
//       const conversationIndex = state.conversations.findIndex(
//         (c) =>
//           c.id.toString() === action.payload.senderId ||
//           c.id.toString() === action.payload.receiverId
//       );
//       if (conversationIndex !== -1) {
//         state.conversations[conversationIndex].lastMessage = action.payload;
//         if (!action.payload.isSender) {
//           state.conversations[conversationIndex].unreadCount += 1;
//         }
//       }
//     },
//     updateUnreadCount: (state, action) => {
//       const conversation = state.conversations.find(
//         (c) => c.id.toString() === action.payload.userId
//       );
//       if (conversation) {
//         conversation.unreadCount = 0;
//       }
//     },
//     updateOnlineStatus: (state, action) => {
//       const { userId, isOnline } = action.payload;
//       const contact = state.contacts.find((c) => c.id.toString() === userId);
//       if (contact) {
//         contact.is_online = isOnline;
//       }
//       const conversation = state.conversations.find(
//         (c) => c.id.toString() === userId
//       );
//       if (conversation) {
//         conversation.is_online = isOnline;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchContacts.fulfilled, (state, action) => {
//         state.contacts = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchConversations.fulfilled, (state, action) => {
//         state.conversations = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchMessagesFromUser.fulfilled, (state, action) => {
//         state.currentConversation = action.payload;
//         state.loading = false;
//       })
//       .addCase(sendDirectMessage.fulfilled, (state, action) => {
//         state.currentConversation.push(action.payload);
//         state.loading = false;
//       })
//       .addMatcher(
//         (action) => action.type.endsWith("/pending"),
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )
//       .addMatcher(
//         (action) => action.type.endsWith("/rejected"),
//         (state, action) => {
//           state.loading = false;
//           state.error = action.error.message;
//         }
//       );
//   },
// });

// export const { addNewMessage, updateUnreadCount, updateOnlineStatus } =
//   directMessageSlice.actions;
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
  loading: boolean;
  error: string | null;
}

const initialState: DirectMessageState = {
  contacts: [],
  conversations: [],
  currentConversation: [],
  loading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk(
  "directMessage/fetchContacts",
  async () => {
    const response = await directMessageService.getContactList();
    return response.contacts;
  }
);

export const fetchConversations = createAsyncThunk(
  "directMessage/fetchConversations",
  async () => {
    const response = await directMessageService.getConversations();
    return response.conversations;
  }
);

export const fetchMessagesFromUser = createAsyncThunk(
  "directMessage/fetchMessagesFromUser",
  async (userId: string) => {
    const response = await directMessageService.getMessagesFromUser(userId);
    return response.messages || [];
  }
);

export const sendDirectMessage = createAsyncThunk(
  "directMessage/sendMessage",
  async (messageData: { receiverId: string; content: string }) => {
    const response = await directMessageService.sendMessage(
      messageData.receiverId,
      messageData.content
    );
    return response;
  }
);

const directMessageSlice = createSlice({
  name: "directMessage",
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      state.currentConversation = [
        ...state.currentConversation,
        action.payload,
      ];

      const conversationIndex = state.conversations.findIndex(
        (c) =>
          c.id.toString() === action.payload.senderId ||
          c.id.toString() === action.payload.receiverId
      );

      if (conversationIndex !== -1) {
        state.conversations[conversationIndex] = {
          ...state.conversations[conversationIndex],
          lastMessage: action.payload,
          unreadCount:
            state.conversations[conversationIndex].unreadCount +
            (!action.payload.isSender ? 1 : 0),
        };
      }
    },
    updateUnreadCount: (state, action) => {
      const conversation = state.conversations.find(
        (c) => c.id.toString() === action.payload.userId
      );
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },
    updateOnlineStatus: (state, action) => {
      const { userId, isOnline } = action.payload;

      state.contacts = state.contacts.map((contact) =>
        contact.id.toString() === userId
          ? { ...contact, is_online: isOnline }
          : contact
      );

      state.conversations = state.conversations.map((conv) =>
        conv.id.toString() === userId ? { ...conv, is_online: isOnline } : conv
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.loading = false;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.loading = false;
      })
      .addCase(fetchMessagesFromUser.fulfilled, (state, action) => {
        state.currentConversation = action.payload;
        state.loading = false;
      })
      .addCase(sendDirectMessage.fulfilled, (state, action) => {
        state.currentConversation = [
          ...state.currentConversation,
          action.payload,
        ];
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "An error occurred";
        }
      );
  },
});

export const { addNewMessage, updateUnreadCount, updateOnlineStatus } =
  directMessageSlice.actions;
export default directMessageSlice.reducer;
