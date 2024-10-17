import React, { useState } from "react";
import { Task } from "../../types/Kanban";
import { Button } from "../ui/Button";
import AddTaskModal from "./AddTaskModal";

interface SprintTasksProps {
  selectedWeek: Date | null;
}

export const SprintTasks: React.FC<SprintTasksProps> = ({ selectedWeek }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setIsAddingTask(false);
  };

  return (
    <div>
      {selectedWeek ? (
        <>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="p-2 bg-gray-100 rounded">
                {task.title}
              </li>
            ))}
          </ul>
          <Button variant="primary" onClick={() => setIsAddingTask(true)} className="mt-4">
            Add Task
          </Button>
          {isAddingTask && (
            <AddTaskModal
              onClose={() => setIsAddingTask(false)}
              onAddTask={addTask}
            />
          )}
        </>
      ) : (
        <p>Please select a week to view tasks.</p>
      )}
    </div>
  );
};
