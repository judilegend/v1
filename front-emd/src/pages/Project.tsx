import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectCard } from "../components/projets/ProjectCard";
import {
  fetchProjects,
  addProject,
  editProject,
  removeProject,
} from "../store/projectSlice";
import { Project as ProjectType } from "../types/type";
import { RootState, AppDispatch } from "../store";

function Project() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, status, error } = useSelector(
    (state: RootState) => state.projects
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  const handleEdit = (id: number, data: Partial<ProjectType>) => {
    dispatch(editProject({ id, project: data }));
  };

  const handleDelete = (id: number) => {
    dispatch(removeProject(id));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            status={"ongoing"} ticketCount={0} clientName={""} progress={0} key={project.id}
            {...project}
            onEdit={handleEdit}
            onDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
}

export default Project;
