import WorkPackage from "../models/workpackage";
import Activity from "../models/activite";

export const createWorkPackage = async (data: Partial<WorkPackage>) => {
  const workPackage = await WorkPackage.create(data);
  return workPackage;
};

export const getWorkPackagesByProjectId = async (projectId: number) => {
  const workPackages = await WorkPackage.findAll({
    where: { projectId },
    include: [{ model: Activity, as: "activities" }],
  });
  return workPackages;
};

export const getWorkPackageById = async (id: number) => {
  const workPackage = await WorkPackage.findByPk(id, {
    include: [{ model: Activity, as: "activities" }],
  });
  return workPackage;
};

export const updateWorkPackage = async (
  id: number,
  data: Partial<WorkPackage>
) => {
  const workPackage = await WorkPackage.findByPk(id);
  if (!workPackage) throw new Error("WorkPackage not found");
  return workPackage.update(data);
};

export const deleteWorkPackage = async (id: number) => {
  const workPackage = await WorkPackage.findByPk(id);
  if (!workPackage) throw new Error("WorkPackage not found");
  await workPackage.destroy();
};
