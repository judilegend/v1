import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";

interface SprintReportProps {
  selectedWeek: Date | null;
}

export const SprintReport: React.FC<SprintReportProps> = ({ selectedWeek }) => {
  const [report, setReport] = useState("");

  const handleSubmit = () => {
    // Submit report logic here
    console.log("Submitting report:", report);
  };

  return (
    <div>
      {selectedWeek ? (
        <>
          <Textarea
            value={report}
            onChange={(e) => setReport(e.target.value)}
            placeholder="Enter your sprint report here..."
            className="w-full h-40"
          />
          <Button onClick={handleSubmit} className="mt-4">
            Submit Report
          </Button>
        </>
      ) : (
        <p>Please select a week to create a report.</p>
      )}
    </div>
  );
};
