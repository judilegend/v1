import React, { useState } from "react";
import { Calendar } from "../components/sprint/Calendar";
import { SprintTasks } from "../components/sprint/SprintTasks";
import { SprintReport } from "../components/sprint/SprintReport";
import { Button } from "../components/ui/Button";

const SprintManagement: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<Date | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Sprint Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sprint Calendar</h2>
          <Calendar onWeekSelect={setSelectedWeek} />
          <Button className="mt-4">Add New Sprint</Button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sprint Tasks</h2>
          <SprintTasks selectedWeek={selectedWeek} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Sprint Report</h2>
        <SprintReport selectedWeek={selectedWeek} />
      </div>
    </div>
  );
};

export default SprintManagement;
