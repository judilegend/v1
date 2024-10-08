import Sprint from "../models/sprint";
import Task from "../models/tache";
import { Op } from "sequelize";

export const createSprint = async (sprintData: Partial<Sprint>) => {
  return Sprint.create(sprintData);
};

export const getSprintsByProjectId = async (projectId: number) => {
  return Sprint.findAll({ where: { projectId } });
};

export const updateSprint = async (
  sprintId: number,
  sprintData: Partial<Sprint>
) => {
  const sprint = await Sprint.findByPk(sprintId);
  if (!sprint) throw new Error("Sprint not found");
  return sprint.update(sprintData);
};

export const deleteSprint = async (sprintId: number) => {
  const sprint = await Sprint.findByPk(sprintId);
  if (!sprint) throw new Error("Sprint not found");
  await sprint.destroy();
};

export const addTaskToSprint = async (sprintId: number, taskId: number) => {
  const sprint = await Sprint.findByPk(sprintId);
  const task = await Task.findByPk(taskId);
  if (!sprint || !task) throw new Error("Sprint or Task not found");
  await task.update({ sprintId });
};

export const removeTaskFromSprint = async (taskId: number) => {
  const task = await Task.findByPk(taskId);
  if (!task) throw new Error("Task not found");
  await task.update({ sprintId: null });
};

export const updateSprintProgress = async (sprintId: number) => {
  const sprint = await Sprint.findByPk(sprintId, {
    include: [{ model: Task, as: "Tasks" }],
  });
  if (!sprint) throw new Error("Sprint not found");

  const totalTasks = sprint.Tasks.length;
  const completedTasks = sprint.Tasks.filter(
    (task) => task.status === "done"
  ).length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  await sprint.update({ progress });
  return sprint;
};

export const generateSprintReport = async (sprintId: number) => {
  const sprint = await Sprint.findByPk(sprintId, {
    include: [{ model: Task, as: "Tasks" }],
  });
  if (!sprint) throw new Error("Sprint not found");

  const totalTasks = sprint.Tasks.length;
  const completedTasks = sprint.Tasks.filter(
    (task) => task.status === "done"
  ).length;
  const inProgressTasks = sprint.Tasks.filter(
    (task) => task.status === "in_progress"
  ).length;
  const remainingTasks = totalTasks - completedTasks - inProgressTasks;

  return {
    sprintId: sprint.id,
    name: sprint.name,
    startDate: sprint.startDate,
    endDate: sprint.endDate,
    goal: sprint.goal,
    progress: sprint.progress,
    status: sprint.status,
    totalTasks,
    completedTasks,
    inProgressTasks,
    remainingTasks,
  };
};

export const getActiveSprintsForProject = async (projectId: number) => {
  const currentDate = new Date();
  return Sprint.findAll({
    where: {
      projectId,
      startDate: { [Op.lte]: currentDate },
      endDate: { [Op.gte]: currentDate },
    },
    include: [{ model: Task, as: "Tasks" }],
  });
};
