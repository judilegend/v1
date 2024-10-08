import React from "react";
import KanbanBoard from "../components/KanbanBoard";

const ActiviteManagement: React.FC = () => {
  return (
    <main className="flex">
      <div className="p-4 w-[1500px]">
        <h2 className="text-2xl font-bold mb-4">Activity Management</h2>
        <KanbanBoard />
      </div>
    </main>
  );
};

export default ActiviteManagement;






















