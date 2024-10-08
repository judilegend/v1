import Project from "../models/project";
import WorkPackage from "../models/workpackage";

export const createProject = async (projectData: Partial<Project>) => {
  const project = await Project.create(projectData);
  return project;
};

export const getAllProjects = async () => {
  const projects = await Project.findAll({
    include: [{ model: WorkPackage, as: "workPackages" }],
  });
  return projects;
};

export const getProjectById = async (id: number) => {
  const project = await Project.findByPk(id, {
    include: [{ model: WorkPackage, as: "workPackages" }],
  });
  return project;
};

export const updateProject = async (id: number, data: Partial<Project>) => {
  const project = await Project.findByPk(id);
  if (!project) {
    throw new Error("Project not found");
  }
  return project.update(data);
};

export const deleteProject = async (id: number) => {
  const project = await Project.findByPk(id);
  if (!project) {
    throw new Error("Project not found");
  }
  return project.destroy();
};
