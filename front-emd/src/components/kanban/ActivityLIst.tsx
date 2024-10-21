import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import AddItemForm from "./AddItemForm";
import { Activity, Task } from "../../types/Kanban";

interface ActivityListProps {
  activities: Activity[];
  onAddTask: (activityId: string, title: string) => void;
  onUpdateTask: (
    activityId: string,
    taskId: string,
    updates: Partial<Task>
  ) => void;
  onDeleteTask: (activityId: string, taskId: string) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <Draggable key={activity.id} draggableId={activity.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="bg-gray-100 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
              <Droppable droppableId={activity.id} type="TASK">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {activity.tasks.map((task, index) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        index={index}
                        onUpdate={(updates) =>
                          onUpdateTask(activity.id, task.id, updates)
                        }
                        onDelete={() => onDeleteTask(activity.id, task.id)}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <AddItemForm
                onAdd={(title) => onAddTask(activity.id, title)}
                placeholder="Add Task" onCancel={function (): void {
                  throw new Error("Function not implemented.");
                } }              />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default ActivityList;
