// import React, { useState } from "react";

// interface AddItemFormProps {
//   onAdd: (title: string) => void;
//   placeholder: string;
// }

// const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd, placeholder }) => {
//   const [title, setTitle] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title.trim()) {
//       onAdd(title.trim());
//       setTitle("");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-4">
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder={placeholder}
//         className="w-full p-2 border rounded"
//       />
//       <button
//         type="submit"
//         className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//       >
//         Add
//       </button>
//     </form>
//   );
// };

// // export default AddItemForm;
// import React, { useState } from "react";
// import { Button } from "../ui/Button";
// import { FaPlus } from "react-icons/fa";

// interface AddItemFormProps {
//   onAdd: (title: string) => void;
//   placeholder: string;
// }

// const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd, placeholder }) => {
//   const [title, setTitle] = useState("");
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title.trim()) {
//       onAdd(title.trim());
//       setTitle("");
//       setIsExpanded(false);
//     }
//   };

//   if (!isExpanded) {
//     return (
//       <Button
//         onClick={() => setIsExpanded(true)}
//         variant="secondary"
//         className="w-full"
//       >
//         <FaPlus className="mr-2" /> {placeholder}
//       </Button>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="mt-4">
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder={placeholder}
//         className="w-full p-2 border rounded mb-2"
//         autoFocus
//       />
//       <div className="flex justify-end space-x-2">
//         <Button
//           type="button"
//           onClick={() => setIsExpanded(false)}
//           variant="secondary"
//         >
//           Cancel
//         </Button>
//         <Button type="submit" variant="primary">
//           Add
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default AddItemForm;
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { FaPlus } from "react-icons/fa";

interface AddItemFormProps {
  onAdd: (title: string) => void;
  placeholder: string;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd, placeholder }) => {
  const [title, setTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        variant="secondary"
        className="w-full"
      >
        <FaPlus className="mr-2" /> {placeholder}
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border rounded mb-2"
        autoFocus
      />
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          onClick={() => setIsExpanded(false)}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddItemForm;
