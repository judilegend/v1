import WorkPackage from "../models/workpackage";

export const createWorkPackage = async (data: Partial<WorkPackage>) => {
  return await WorkPackage.create(data);
};

export const getWorkPackagesByProjectId = async (projectId: number) => {
  return await WorkPackage.findAll({ where: { projectId } });
};

export const updateWorkPackage = async (
  id: number,
  data: Partial<WorkPackage>
) => {
  const workPackage = await WorkPackage.findByPk(id);
  if (!workPackage) throw new Error("WorkPackage not found");
  return await workPackage.update(data);
};

export const deleteWorkPackage = async (id: number) => {
  const workPackage = await WorkPackage.findByPk(id);
  if (!workPackage) throw new Error("WorkPackage not found");
  await workPackage.destroy();
};
