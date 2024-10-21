import React, { useState } from "react";
import { Button } from "../ui/Button";
import { FaPlus } from "react-icons/fa";

interface AddItemFormProps {
  onAdd: (title: string) => void;
  placeholder: string;
  onCancel: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({
  onAdd,
  placeholder,
  onCancel,
}) => {
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

  const handleCancel = () => {
    setTitle("");
    setIsExpanded(false);
    onCancel();
  };

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
        <Button type="button" onClick={handleCancel} variant="secondary">
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
