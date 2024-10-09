import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addActivite } from "../store/slices/activiteSlice";
import { AppDispatch } from "../store";

interface Props {
  workPackageId: number;
}

const AddActivityForm: React.FC<Props> = ({ workPackageId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !description.trim()) {
      setError("Name and description are required");
      return;
    }
    try {
      await dispatch(
        addActivite({
          workPackageId,
          name,
          description,
          status: "todo",
        })
      ).unwrap();
      setName("");
      setDescription("");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to create activity"
      );
    }
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
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default AddActivityForm;
