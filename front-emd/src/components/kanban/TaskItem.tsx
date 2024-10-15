import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/Kanban";

interface TaskItemProps {
  task: Task;
  index: number;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  onUpdate,
  onDelete,
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-2 mb-2 rounded shadow-sm"
        >
          <div className="flex justify-between items-center">
            <span>{task.title}</span>
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
