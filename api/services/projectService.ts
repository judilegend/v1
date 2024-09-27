import Project from "../models/project";

export const creerProject = async (
  title: string,
  description: string,
  budget: number,
  deadline: Date
) => {
  const project = await Project.create({
    title,
    description,
    budget,
    deadline,
  });
  return project;
};

export const getAllProjects = async () => {
  const projects = Project.findAll();
  return projects;
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
