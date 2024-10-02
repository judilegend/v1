import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addActivite } from "../store/activiteSlice";
import { AppDispatch } from "../store";

interface Props {
  workPackageId: number;
}

const AddActivityForm: React.FC<Props> = ({ workPackageId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addActivite({
      name, description, workPackageId,
      status: "todo"
    }));
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Activity Name"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Activity
      </button>
    </form>
  );
};

export default AddActivityForm;
