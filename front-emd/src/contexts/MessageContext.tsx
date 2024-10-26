import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface MessageState {
  isTyping: boolean;
  unreadCount: number;
  selectedContact: string | null;
}

type MessageAction =
  | { type: "SET_TYPING"; payload: boolean }
  | { type: "SET_UNREAD_COUNT"; payload: number }
  | { type: "SET_SELECTED_CONTACT"; payload: string | null };

const MessageContext = createContext<
  | {
      state: MessageState;
      dispatch: React.Dispatch<MessageAction>;
    }
  | undefined
>(undefined);

const messageReducer = (
  state: MessageState,
  action: MessageAction
): MessageState => {
  switch (action.type) {
    case "SET_TYPING":
      return { ...state, isTyping: action.payload };
    case "SET_UNREAD_COUNT":
      return { ...state, unreadCount: action.payload };
    case "SET_SELECTED_CONTACT":
      return { ...state, selectedContact: action.payload };
    default:
      return state;
  }
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: MessageState = {
    isTyping: false,
    unreadCount: 0,
    selectedContact: null,
  };

  const [state, dispatch] = useReducer(messageReducer, initialState);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      // Setup socket listeners here
    }
  }, [user]);

  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
