import React, { useState } from "react";

interface AddItemFormProps {
  onAdd: (title: string) => void;
  placeholder: string;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd, placeholder }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default AddItemForm;
