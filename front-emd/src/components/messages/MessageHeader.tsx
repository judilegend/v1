// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";

// interface MessageHeaderProps {
//   contactId: string | null;
// }

// const MessageHeader: React.FC<MessageHeaderProps> = ({ contactId }) => {
//   const { contacts } = useSelector((state: RootState) => state.directMessage);
//   const contact = contacts.find((c: any) => c.id === contactId);

//   return (
//     <div className="bg-white border-b px-4 py-3 flex items-center">
//       {contact ? (
//         <>
//           <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
//             {contact.name?.[0]?.toUpperCase()}
//           </div>
//           <div className="ml-3">
//             <h3 className="font-semibold">{contact.name}</h3>
//             <span className="text-sm text-gray-500">
//               {contact.is_online ? "Online" : "Offline"}
//             </span>
//           </div>
//         </>
//       ) : (
//         <div className="text-gray-500">Select a conversation</div>
//       )}
//     </div>
//   );
// };

// export default MessageHeader;
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface MessageHeaderProps {
  contactId: string | null;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ contactId }) => {
  const { contacts = [] } = useSelector(
    (state: RootState) => state.directMessage
  );
  const contact = contacts.find((c) => c?.id?.toString() === contactId);

  if (!contact) {
    return (
      <div className="bg-white border-b px-4 py-3">
        <div className="text-gray-500">Select a contact to start messaging</div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b px-4 py-3 flex items-center">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          {contact.name[0].toUpperCase()}
        </div>
        <div
          className={`absolute -right-1 -bottom-1 w-3 h-3 rounded-full border-2 border-white
            ${contact.is_online ? "bg-green-500" : "bg-gray-400"}
          `}
        />
      </div>
      <div className="ml-3">
        <h3 className="font-semibold">{contact.name}</h3>
        <span className="text-sm text-gray-500">
          {contact.is_online ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
};

export default MessageHeader;
