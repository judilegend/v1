import React from "react";
import { Task } from "../../types/Kanban";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
}) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between">
          <span>{task.title}</span>
          <div>
            <button
              onClick={() => onUpdateTask(task.id, { status: "done" })}
              className="text-green-500 mr-2"
            >
              ✓
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-red-500"
            >
              ×
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
