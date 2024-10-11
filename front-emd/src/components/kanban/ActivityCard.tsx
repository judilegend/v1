import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskList from "./TaskList";
import AddItemForm from "./AddItemForm";
import { Activity, Task } from "../../types/Kanban";

interface ActivityCardProps {
  activity: Activity;
  index: number;
  onAddTask: (title: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  index,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Draggable draggableId={activity.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded-lg shadow-sm"
        >
          <h3
            className="text-lg font-semibold mb-2 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {activity.title}
          </h3>
          {isExpanded && (
            <>
              <TaskList
                tasks={activity.tasks}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
              />
              <AddItemForm onAdd={onAddTask} placeholder="Add Task" />
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ActivityCard;
