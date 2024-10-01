import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import io from "socket.io-client";
import { RootState, AppDispatch } from "../store";
import Sidebar from "../components/SIdebar";
import { fetchUsers, updateUserStatus } from "../store/userSlice";

const socket = io("http://localhost:5000");

interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiver, setReceiver] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
    console.log(messages);
    if (user) {
      socket.emit("join", user.id);
      console.log(user);
      socket.on("newMessage", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      // dispatch(updateUserStatus({ id: userId, isOnline: false }));

      socket.on("userStatusChange", ({ userId, isOnline }) => {
        dispatch(updateUserStatus({ id: userId, isOnline }));
      });
      console.log();

      fetch(`http://localhost:5000/api/messages/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setMessages(data);
          } else {
            console.error("Received non-array data:", data);
            setMessages([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
          setMessages([]);
        });
    }

    return () => {
      socket.off("newMessage");
      socket.off("userStatusChange");
    };
  }, [dispatch, user]);

  const handleSendMessage = (
    values: { content: string },
    { resetForm }: any
  ) => {
    if (user && receiver) {
      const messageData = {
        senderId: user.id,
        receiverId: receiver,
        content: values.content,
      };
      socket.emit("sendMessage", messageData);
      resetForm();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold">Chat</h1>
        </div>
        <div className="flex-1 flex">
          <div className="w-1/4 bg-white p-4 border-r">
            <h2 className="text-lg font-semibold mb-4">Users</h2>
            <select
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            >
              <option value="">Select a user</option>
              {users
                .filter((u) => u.id !== user?.id) // Exclure l'utilisateur actuel
                .map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.username}
                  </option>
                ))}
            </select>
            {users.map((u) => (
              <div key={u.id} className="flex items-center mb-2">
                <span
                  className={`w-3 h-3 rounded-full mr-2 ${
                    u.isOnline ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></span>
                <span>{u.username}</span>
              </div>
            ))}
          </div>
          <div className="w-3/4 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {Array.isArray(messages) &&
                messages.map((message) => (
                  <div
                    key={message.id}
                    // className={`mb-4 ${
                    //   messages?.senderId === user?.id
                    //     ? "text-right"
                    //     : "text-left"
                    // }`}
                  >
                    <div
                    // className={`inline-block p-2 rounded-lg ${
                    //   messages?.senderId === user?.id
                    //     ? "bg-blue-500 text-white"
                    //     : "bg-gray-200"
                    // }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="bg-white p-4">
              <input
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                placeholder="Enter receiver's ID"
                className="w-full p-2 mb-2 border rounded"
              />
              <Formik
                initialValues={{ content: "" }}
                onSubmit={handleSendMessage}
              >
                <Form className="flex">
                  <Field
                    name="content"
                    className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Send
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
