import React, { useState } from "react";
import IconButton from "../ui/IconButton";

interface AddNewColumnProps {
  onAdd: (type: string, title: string) => void;
}

const AddNewColumn: React.FC<AddNewColumnProps> = ({ onAdd }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [type, setType] = useState("workpackage");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(type, title);
    setTitle("");
    setIsFormOpen(false);
  };

  return (
    <div className="add-new-column">
      {!isFormOpen ? (
        <h5 onClick={() => setIsFormOpen(true)}>
          <IconButton icon="plus" />
          <span>Add New</span>
        </h5>
      ) : (
        <form onSubmit={handleSubmit}>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="workpackage">Work Package</option>
            <option value="activity">Activity</option>
            <option value="task">Task</option>
          </select>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
          <button type="submit">Add</button>
          <button type="button" onClick={() => setIsFormOpen(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AddNewColumn;
