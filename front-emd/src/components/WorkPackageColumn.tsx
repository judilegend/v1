import React from "react";
import { WorkPackage } from "../types/type";
import WorkPackageCard from "./WorkPackageCard";

interface Props {
  title: string;
  workPackages: WorkPackage[];
}

const WorkPackageColumn: React.FC<Props> = ({ title, workPackages }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-1/3">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {workPackages.map((workPackage) => (
          <WorkPackageCard key={workPackage.id} workPackage={workPackage} />
        ))}
      </div>
    </div>
  );
};

export default WorkPackageColumn;
