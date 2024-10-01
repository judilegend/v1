import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWorkPackage } from "../store/workpackageSlice";
import { AppDispatch } from "../store";

interface Props {
  projectId: number;
}

const AddWorkPackageForm: React.FC<Props> = ({ projectId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addWorkPackage({ projectId, name, description, status: "todo" }));
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Work Package Name"
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
        Add Work Package
      </button>
    </form>
  );
};

export default AddWorkPackageForm;
