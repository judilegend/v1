import Task from "../models/tache";

export const categorizeTask = async (
  taskId: number,
  urgency: string,
  importance: string
) => {
  const task = await Task.findByPk(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  await task.update({ urgency, importance });
  return task;
};

export const getTasksByQuadrant = async () => {
  const tasks = await Task.findAll();
  const quadrants = {
    "urgent-important": [],
    "urgent-not-important": [],
    "not-urgent-important": [],
    "not-urgent-not-important": [],
  };

  tasks.forEach((task) => {
    const key = `${task.urgency}-${task.importance}`;
    quadrants[key].push(task);
  });

  return quadrants;
};
