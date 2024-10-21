import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { FaPlus } from "react-icons/fa";

interface AddActivityFormProps {
  onAdd: (title: string, description: string) => void;
}

const AddActivityForm: React.FC<AddActivityFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
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
        <FaPlus className="mr-2" /> Add Activity
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Activity Title"
        className="w-full p-2 border rounded mb-2"
        autoFocus
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Activity Description"
        className="w-full p-2 border rounded mb-2"
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
          Add Activity
        </Button>
      </div>
    </form>
  );
};

export default AddActivityForm;
