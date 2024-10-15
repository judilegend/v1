// import React, { useState } from "react";
// import { Draggable } from "react-beautiful-dnd";
// import TaskList from "./TaskList";
// import AddItemForm from "./AddItemForm";
// import { Activity, Task } from "../../types/Kanban";

// interface ActivityCardProps {
//   activity: Activity;
//   index: number;
//   onAddTask: (title: string) => void;
//   onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
//   onDeleteTask: (taskId: string) => void;
// }

// const ActivityCard: React.FC<ActivityCardProps> = ({
//   activity,
//   index,
//   onAddTask,
//   onUpdateTask,
//   onDeleteTask,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <Draggable draggableId={activity.id} index={index}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           className="bg-white p-4 rounded-lg shadow-sm"
//         >
//           <h3
//             className="text-lg font-semibold mb-2 cursor-pointer"
//             onClick={() => setIsExpanded(!isExpanded)}
//           >
//             {activity.title}
//           </h3>
//           {isExpanded && (
//             <>
//               <TaskList
//                 tasks={activity.tasks}
//                 onUpdateTask={onUpdateTask}
//                 onDeleteTask={onDeleteTask}
//               />
//               <AddItemForm onAdd={onAddTask} placeholder="Add Task" />
//             </>
//           )}
//         </div>
//       )}
//     </Draggable>
//   );
// };

// export default ActivityCard;
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Activity } from "../../types/Kanban";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../ui/Button";

interface ActivityCardProps {
  activity: Activity;
  index: number;
  onEdit: (activity: Activity) => void;
  onDelete: (activityId: string) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  index,
  onEdit,
  onDelete,
}) => {
  return (
    <Draggable draggableId={activity.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded-lg shadow-sm mb-2"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{activity.title}</h3>
            <div>
              <Button
                onClick={() => onEdit(activity)}
                variant="icon"
                className="mr-2"
              >
                <FaEdit />
              </Button>
              <Button onClick={() => onDelete(activity.id)} variant="icon">
                <FaTrash />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600">{activity.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default ActivityCard;
