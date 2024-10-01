import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  addProject,
  editProject,
  removeProject,
} from "../store/projectSlice";
import Sidebar from "../components/SIdebar";
import { Project as ProjectType } from "../types/type";
import { RootState } from "../store";
import { AppDispatch } from "../store";

function Project() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, status, error } = useSelector(
    (state: RootState) => state.projects
  );
  // const { user } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<Omit<ProjectType, "id">>({
    title: "",
    description: "",
    budget: 0,
    deadline: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects() as any);
    }
    // console.log(user);
    // console.log(userId);
    console.log(projects);
  }, [status, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dispatch(editProject({ id: editingId, project: formData }) as any);
      setEditingId(null);
    } else {
      dispatch(addProject(formData) as any);
    }
    setFormData({ title: "", description: "", budget: 0, deadline: "" });
  };

  const handleEdit = (project: ProjectType) => {
    setFormData(project);
    setEditingId(project.id);
  };

  const handleDelete = (id: number) => {
    dispatch(removeProject(id) as any);
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Project Management
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Project Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Project Description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
              required
            />
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Budget"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {editingId ? "Update Project" : "Add Project"}
            </button>
          </form>

          {!user && <div>user not found</div>}
        </div>
      </div>
      {user && user.role === "admin" && (
        <div className="space-y-4 ">
          {projects.map((project) => (
            <div key={project.id} className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p>{project.description}</p>
              <p>Budget: ${project.budget}</p>
              <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md"
                >
                  Delete
                </button>
                <button
                  // onClick={() => handleEdit(project)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2"
                >
                  manage
                </button>
                <button
                  // onClick={() => handleEdit(project)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2"
                >
                  voir plus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Project;
