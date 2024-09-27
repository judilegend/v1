import React, { useState } from "react";
import Sidebar from "./SIdebar";

interface Email {
  id: number;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  date: Date;
  read: boolean;
}

const Messagerie: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      sender: "john@example.com",
      recipient: "you@example.com",
      subject: "Project Update",
      content: "Here's the latest update on our ongoing project...",
      date: new Date("2023-04-15T10:30:00"),
      read: false,
    },
    {
      id: 2,
      sender: "sarah@example.com",
      recipient: "you@example.com",
      subject: "Meeting Reminder",
      content: "Don't forget our team meeting tomorrow at 2 PM...",
      date: new Date("2023-04-14T15:45:00"),
      read: true,
    },
    // Add more mock emails as needed
  ]);

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [composing, setComposing] = useState(false);
  const [newEmail, setNewEmail] = useState({
    recipient: "",
    subject: "",
    content: "",
  });

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      const updatedEmails = emails.map((e) =>
        e.id === email.id ? { ...e, read: true } : e
      );
      setEmails(updatedEmails);
    }
  };

  const filteredEmails = emails.filter((email) => {
    if (filter === "unread") return !email.read;
    if (filter === "read") return email.read;
    return true;
  });

  const handleSendEmail = () => {
    const newEmailObj: Email = {
      id: emails.length + 1,
      sender: "you@example.com",
      recipient: newEmail.recipient,
      subject: newEmail.subject,
      content: newEmail.content,
      date: new Date(),
      read: true,
    };
    setEmails([newEmailObj, ...emails]);
    setComposing(false);
    setNewEmail({ recipient: "", subject: "", content: "" });
  };

  const handleReply = () => {
    if (selectedEmail) {
      setComposing(true);
      setNewEmail({
        recipient: selectedEmail.sender,
        subject: `Re: ${selectedEmail.subject}`,
        content: `\n\nOn ${selectedEmail.date.toLocaleString()}, ${
          selectedEmail.sender
        } wrote:\n${selectedEmail.content}`,
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Messagerie</h1>
          <div>
            <button
              onClick={() => setComposing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Compose
            </button>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border p-2 rounded"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/3 bg-white border-r overflow-y-auto">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  email.read ? "bg-gray-50" : "font-bold"
                }`}
                onClick={() => handleEmailClick(email)}
              >
                <p className="text-sm text-gray-600">{email.sender}</p>
                <p className="text-base">{email.subject}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {email.date.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="w-2/3 bg-white p-6 overflow-y-auto">
            {composing ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">New Message</h2>
                <input
                  type="text"
                  placeholder="To"
                  value={newEmail.recipient}
                  onChange={(e) =>
                    setNewEmail({ ...newEmail, recipient: e.target.value })
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={newEmail.subject}
                  onChange={(e) =>
                    setNewEmail({ ...newEmail, subject: e.target.value })
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                  placeholder="Message"
                  value={newEmail.content}
                  onChange={(e) =>
                    setNewEmail({ ...newEmail, content: e.target.value })
                  }
                  className="w-full p-2 mb-2 border rounded h-64"
                />
                <button
                  onClick={handleSendEmail}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Send
                </button>
              </div>
            ) : selectedEmail ? (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedEmail.subject}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  From: {selectedEmail.sender}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {selectedEmail.date.toLocaleString()}
                </p>
                <div className="border-t pt-4">
                  <p>{selectedEmail.content}</p>
                </div>
                <button
                  onClick={handleReply}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Reply
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-10">
                Select an email to read
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messagerie;
