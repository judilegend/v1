// import React from "react";
// import { Droppable } from "react-beautiful-dnd";
// import ActivityList from "./ActivityLIst";
// import AddActivityForm from "./AddActivityForm";
// import { WorkPackage, Activity, Task } from "../../types/Kanban";
// import { Button } from "../ui/Button";
// import { FaEdit } from "react-icons/fa";

// interface WorkPackageColumnProps {
//   workPackage: WorkPackage;
//   onAddActivity: (title: string, description: string) => void;
//   onAddTask: (activityId: string, title: string) => void;
//   onUpdateTask: (
//     activityId: string,
//     taskId: string,
//     updates: Partial<Task>
//   ) => void;
//   onDeleteTask: (activityId: string, taskId: string) => void;
//   onWorkPackageClick: () => void;
// }

// const WorkPackageColumn: React.FC<WorkPackageColumnProps> = ({
//   workPackage,
//   onAddActivity,
//   onAddTask,
//   onUpdateTask,
//   onDeleteTask,
//   onWorkPackageClick,
// }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 w-80 flex-shrink-0">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">{workPackage.title}</h2>
//         <Button onClick={onWorkPackageClick} variant="icon">
//           <FaEdit />
//         </Button>
//       </div>
//       <Droppable droppableId={workPackage.id} type="ACTIVITY">
//         {(provided) => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             <ActivityList
//               activities={workPackage.activities}
//               onAddTask={onAddTask}
//               onUpdateTask={onUpdateTask}
//               onDeleteTask={onDeleteTask}
//             />
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//       <AddActivityForm onAdd={onAddActivity} />
//     </div>
//   );
// };

// // export default WorkPackageColumn;
// import React, { useState } from "react";
// import { Droppable, Draggable } from "react-beautiful-dnd";
// import { WorkPackage, Activity } from "../../types/Kanban";
// import { Button } from "../ui/Button";
// import { FaPlus, FaUser } from "react-icons/fa";
// import { WorkPackageModal } from "../modals/WorkpackageModal";

// interface WorkPackageColumnProps {
//   workPackage: WorkPackage;
//   index: number;
//   onAddActivity: (workPackageId: string, title: string) => void;
//   onUpdateWorkPackage: (updatedWorkPackage: WorkPackage) => void;
// }

// const WorkPackageColumn: React.FC<WorkPackageColumnProps> = ({
//   workPackage,
//   index,
//   onAddActivity,
//   onUpdateWorkPackage,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddActivity = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleUpdateWorkPackage = (updatedWorkPackage: WorkPackage) => {
//     onUpdateWorkPackage(updatedWorkPackage);
//     setIsModalOpen(false);
//   };

//   return (
//     <Draggable draggableId={workPackage.id} index={index}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           className="bg-white rounded-lg shadow-md p-4 w-80 flex-shrink-0"
//         >
//           <h2 className="text-xl font-semibold mb-4">{workPackage.title}</h2>
//           <Droppable droppableId={workPackage.id} type="ACTIVITY">
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className="space-y-2"
//               >
//                 {workPackage.activities.map(
//                   (activity: Activity, activityIndex: number) => (
//                     <Draggable
//                       key={activity.id}
//                       draggableId={activity.id}
//                       index={activityIndex}
//                     >
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="bg-gray-100 p-2 rounded"
//                         >
//                           <div className="flex items-center justify-between">
//                             <span>{activity.title}</span>
//                             <div className="flex items-center">
//                               {activity.contributors.map(
//                                 (contributor, index) => (
//                                   <div
//                                     key={index}
//                                     className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs -ml-2 first:ml-0"
//                                   >
//                                     <FaUser />
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   )
//                 )}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           <Button onClick={handleAddActivity} className="mt-4 w-full">
//             <FaPlus className="mr-2" /> Add Activity
//           </Button>
//           <WorkPackageModal
//             isOpen={isModalOpen}
//             onClose={handleCloseModal}
//             workPackage={workPackage}
//             onUpdate={handleUpdateWorkPackage}
//           />
//         </div>
//       )}
//     </Draggable>
//   );
// };

// // export default WorkPackageColumn;
// import React, { useState } from "react";
// import { Droppable, Draggable } from "react-beautiful-dnd";
// import { WorkPackage, Activity } from "../../types/Kanban";
// import { Button } from "../ui/Button";
// import { FaPlus, FaUser, FaImage } from "react-icons/fa";
// import { WorkPackageModal } from "../modals/WorkpackageModal";

// interface WorkPackageColumnProps {
//   workPackage: WorkPackage;
//   index: number;
//   onAddActivity: (workPackageId: string, title: string) => void;
//   onUpdateWorkPackage: (updatedWorkPackage: WorkPackage) => void;
// }

// const WorkPackageColumn: React.FC<WorkPackageColumnProps> = ({
//   workPackage,
//   index,
//   onAddActivity,
//   onUpdateWorkPackage,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddActivity = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleUpdateWorkPackage = (updatedWorkPackage: WorkPackage) => {
//     onUpdateWorkPackage(updatedWorkPackage);
//     setIsModalOpen(false);
//   };

//   const renderActivityPreview = (activity: Activity) => {
//     if (activity.image) {
//       return (
//         <div className="relative w-full h-32 mb-2">
//           <img
//             src={activity.image}
//             alt={activity.title}
//             className="w-full h-full object-cover rounded"
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm truncate">
//             {activity.title}
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="bg-gray-200 w-full h-32 flex items-center justify-center mb-2 rounded">
//           <FaImage className="text-gray-400 text-4xl" />
//           <span className="ml-2 text-sm font-medium truncate">
//             {activity.title}
//           </span>
//         </div>
//       );
//     }
//   };

//   return (
//     <Draggable draggableId={workPackage.id} index={index}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           className="bg-white rounded-lg shadow-md p-4 w-80 flex-shrink-0"
//         >
//           <h2 className="text-xl font-semibold mb-4">{workPackage.title}</h2>
//           <Droppable droppableId={workPackage.id} type="ACTIVITY">
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className="space-y-4"
//               >
//                 {workPackage.activities.map(
//                   (activity: Activity, activityIndex: number) => (
//                     <Draggable
//                       key={activity.id}
//                       draggableId={activity.id}
//                       index={activityIndex}
//                     >
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="bg-gray-100 p-2 rounded"
//                         >
//                           {renderActivityPreview(activity)}
//                           <div className="flex items-center justify-between">
//                             <span className="font-medium">
//                               {activity.title}
//                             </span>
//                             <div className="flex items-center">
//                               {activity.contributors.map(
//                                 (contributor, index) => (
//                                   <div
//                                     key={index}
//                                     className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs -ml-2 first:ml-0"
//                                   >
//                                     <FaUser />
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   )
//                 )}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           <Button onClick={handleAddActivity} className="mt-4 w-full">
//             <FaPlus className="mr-2" /> Add Activity
//           </Button>
//           <WorkPackageModal
//             isOpen={isModalOpen}
//             onClose={handleCloseModal}
//             workPackage={workPackage}
//             onUpdate={handleUpdateWorkPackage}
//           />
//         </div>
//       )}
//     </Draggable>
//   );
// };

// export default WorkPackageColumn;import React, { useState } from 'react';
// import { Draggable, Droppable } from "react-beautiful-dnd";
// import { WorkPackage, Activity } from "../../types/Kanban";
// import { Button } from "../ui/Button";
// import { useState } from "react";
// import { FaPlus, FaUser, FaImage } from "react-icons/fa";
// import AddItemForm from "./AddItemForm";

// interface WorkPackageColumnProps {
//   workPackage: WorkPackage;
//   index: number;
//   onAddActivity: (workPackageId: string, title: string) => void;
//   onUpdateWorkPackage: (updatedWorkPackage: WorkPackage) => void;
//   onWorkPackageClick: () => void;
// }

// const WorkPackageColumn: React.FC<WorkPackageColumnProps> = ({
//   workPackage,
//   index,
//   onAddActivity,
//   onUpdateWorkPackage,
//   onWorkPackageClick,
// }) => {
//   const [isAddingActivity, setIsAddingActivity] = useState(false);

//   const handleAddActivity = (title: string) => {
//     onAddActivity(workPackage.id, title);
//     setIsAddingActivity(false);
//   };

//   const renderActivityPreview = (activity: Activity) => {
//     if (activity.image) {
//       return (
//         <div className="relative w-full h-32 mb-2">
//           <img
//             src={activity.image}
//             alt={activity.title}
//             className="w-full h-full object-cover rounded"
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm truncate">
//             {activity.title}
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="bg-gray-200 w-full h-32 flex items-center justify-center mb-2 rounded">
//           <FaImage className="text-gray-400 text-4xl" />
//           <span className="ml-2 text-sm font-medium truncate">
//             {activity.title}
//           </span>
//         </div>
//       );
//     }
//   };

//   return (
//     <Draggable draggableId={workPackage.id} index={index}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           className="bg-white rounded-lg shadow-md p-4 w-80 flex-shrink-0"
//         >
//           <h2
//             className="text-xl font-semibold mb-4 cursor-pointer"
//             onClick={onWorkPackageClick}
//           >
//             {workPackage.title}
//           </h2>
//           <Droppable droppableId={workPackage.id} type="ACTIVITY">
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className="space-y-4"
//               >
//                 {workPackage.activities.map(
//                   (activity: Activity, activityIndex: number) => (
//                     <Draggable
//                       key={activity.id}
//                       draggableId={activity.id}
//                       index={activityIndex}
//                     >
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="bg-gray-100 p-2 rounded"
//                         >
//                           {renderActivityPreview(activity)}
//                           <div className="flex items-center justify-between">
//                             <span className="font-medium">
//                               {activity.title}
//                             </span>
//                             <div className="flex items-center">
//                               {activity.contributors?.map(
//                                 (contributor, index) => (
//                                   <div
//                                     key={index}
//                                     className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs -ml-2 first:ml-0"
//                                   >
//                                     <FaUser />
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   )
//                 )}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           {isAddingActivity ? (
//             <AddItemForm
//               onAdd={handleAddActivity}
//               placeholder="Enter Activity Title"
//               onCancel={() => setIsAddingActivity(false)}
//             />
//           ) : (
//             <Button
//               onClick={() => setIsAddingActivity(true)}
//               className="mt-4 w-full"
//             >
//               <FaPlus className="mr-2" /> Add Activity
//             </Button>
//           )}
//         </div>
//       )}
//     </Draggable>
//   );
// };

// // export default WorkPackageColumn;
// import React, { useState } from "react";
// import { Draggable, Droppable } from "react-beautiful-dnd";
// import { WorkPackage, Activity } from "../../types/Kanban";
// import { Button } from "../ui/Button";
// import { FaPlus, FaUser, FaImage } from "react-icons/fa";
// import AddItemForm from "./AddItemForm";
// import { ActivityModal } from "../modals/ActivityModal";

// interface WorkPackageColumnProps {
//   workPackage: WorkPackage;
//   index: number;
//   onAddActivity: (workPackageId: string, title: string) => void;
//   onUpdateWorkPackage: (updatedWorkPackage: WorkPackage) => void;
//   onWorkPackageClick: () => void;
//   onUpdateActivity: (workPackageId: string, updatedActivity: Activity) => void;
// }

// const WorkPackageColumn: React.FC<WorkPackageColumnProps> = ({
//   workPackage,
//   index,
//   onAddActivity,
//   onUpdateWorkPackage,
//   onWorkPackageClick,
//   onUpdateActivity,
// }) => {
//   const [isAddingActivity, setIsAddingActivity] = useState(false);
//   const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
//     null
//   );

//   const handleAddActivity = (title: string) => {
//     onAddActivity(workPackage.id, title);
//     setIsAddingActivity(false);
//   };

//   const handleActivityClick = (activity: Activity) => {
//     setSelectedActivity(activity);
//   };

//   const handleCloseModal = () => {
//     setSelectedActivity(null);
//   };

//   const handleUpdateActivity = (updatedActivity: Activity) => {
//     onUpdateActivity(workPackage.id, updatedActivity);
//     setSelectedActivity(null);
//   };

//   const renderActivityPreview = (activity: Activity) => {
//     if (activity.image) {
//       return (
//         <div className="relative w-full h-32 mb-2">
//           <img
//             src={activity.image}
//             alt={activity.title}
//             className="w-full h-full object-cover rounded"
//           />
//           <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm truncate">
//             {activity.title}
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="bg-gray-200 w-full h-32 flex items-center justify-center mb-2 rounded">
//           <FaImage className="text-gray-400 text-4xl" />
//           <span className="ml-2 text-sm font-medium truncate">
//             {activity.title}
//           </span>
//         </div>
//       );
//     }
//   };

//   return (
//     <Draggable draggableId={workPackage.id} index={index}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           className="bg-white rounded-lg shadow-md p-4 w-80 flex-shrink-0"
//         >
//           <h2
//             className="text-xl font-semibold mb-4 cursor-pointer"
//             onClick={onWorkPackageClick}
//           >
//             {workPackage.title}
//           </h2>
//           <Droppable droppableId={workPackage.id} type="ACTIVITY">
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className="space-y-4"
//               >
//                 {workPackage.activities.map(
//                   (activity: Activity, activityIndex: number) => (
//                     <Draggable
//                       key={activity.id}
//                       draggableId={activity.id}
//                       index={activityIndex}
//                     >
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="bg-gray-100 p-2 rounded cursor-pointer"
//                           onClick={() => handleActivityClick(activity)}
//                         >
//                           {renderActivityPreview(activity)}
//                           <div className="flex items-center justify-between">
//                             <span className="font-medium">
//                               {activity.title}
//                             </span>
//                             <div className="flex items-center">
//                               {activity.contributors?.map(
//                                 (contributor, index) => (
//                                   <div
//                                     key={index}
//                                     className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs -ml-2 first:ml-0"
//                                   >
//                                     <FaUser />
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   )
//                 )}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           {isAddingActivity ? (
//             <AddItemForm
//               onAdd={handleAddActivity}
//               placeholder="Enter Activity Title"
//               onCancel={() => setIsAddingActivity(false)}
//             />
//           ) : (
//             <Button
//               onClick={() => setIsAddingActivity(true)}
//               className="mt-4 w-full"
//             >
//               <FaPlus className="mr-2" /> Add Activity
//             </Button>
//           )}
//           {selectedActivity && (
//             <ActivityModal
//               activity={selectedActivity}
//               isOpen={!!selectedActivity}
//               onClose={handleCloseModal}
//               onUpdate={handleUpdateActivity}
//             />
//           )}
//         </div>
//       )}
//     </Draggable>
//   );
// };

// export default WorkPackageColumn;import React, { useState } from 'react';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { WorkPackage, Activity } from '../../types/Kanban';
import { Button } from '../ui/Button';
import { FaPlus, FaUser, FaImage } from 'react-icons/fa';
import AddItemFom from './AddItemForm';
import { ActivityModal } from '../modals/ActivityModal';

interface WorkPackageColumnProps {
  workPackage: WorkPackage;
  index: number;
  onAddActivity: (workPackageId: string, title: string) => void;
  onUpdateWorkPackage: (updatedWorkPackage: WorkPackage) => void;
  onWorkPackageClick: () => void;
  onUpdateActivity: (workPackageId: string, updatedActivity: Activity) => void;
}

const WorkPackageColumn: React.FC<WorkPackageColumnProps> = ({
  workPackage,
  index,
  onAddActivity,
  onUpdateWorkPackage,
  onWorkPackageClick,
  onUpdateActivity,
}) => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleAddActivity = (title: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      title,
      description: '',
      tasks: [],
      contributors: [],
    };
    onAddActivity(workPackage.id, title);
    setIsAddingActivity(false);
  };

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleCloseModal = () => {
    setSelectedActivity(null);
  };

  const handleUpdateActivity = (updatedActivity: Activity) => {
    onUpdateActivity(workPackage.id, updatedActivity);
    setSelectedActivity(null);
  };

  const getActivityImage = (activity: Activity): string | null => {
    for (const task of activity.tasks) {
      if (task.description && task.description.includes('![')) {
        const match = task.description.match(/!\[.*?\]\((.*?)\)/);
        if (match && match[1]) {
          return match[1];
        }
      }
    }
    return null;
  };

  const renderActivityCard = (activity: Activity) => {
    const activityImage = getActivityImage(activity);

    return (
      <div
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
        onClick={() => handleActivityClick(activity)}
      >
        {activityImage ? (
          <div className="relative w-full h-32 mb-2">
            <img
              src={activityImage}
              alt={activity.title}
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-sm truncate">
              {activity.title}
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 w-full h-32 flex items-center justify-center mb-2 rounded">
            <FaImage className="text-gray-400 text-4xl" />
          </div>
        )}
        <h3 className="font-medium text-lg mb-2">{activity.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{activity.tasks.length} tasks</span>
          <div className="flex items-center">
            {activity.contributors?.map((contributor, index) => (
              <div key={index} className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs -ml-2 first:ml-0">
                <FaUser />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Draggable draggableId={workPackage.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg shadow-md p-4 w-80 flex-shrink-0"
        >
          <h2 className="text-xl font-semibold mb-4 cursor-pointer" onClick={onWorkPackageClick}>
            {workPackage.title}
          </h2>
          <Droppable droppableId={workPackage.id} type="ACTIVITY">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
                {workPackage.activities.map((activity, activityIndex) => (
                  <Draggable key={activity.id} draggableId={activity.id} index={activityIndex}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {renderActivityCard(activity)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {isAddingActivity ? (
            <AddItemFom
              onAdd={handleAddActivity}
              placeholder="Enter Activity Title"
              onCancel={() => setIsAddingActivity(false)}
            />
          ) : (
            <Button onClick={() => setIsAddingActivity(true)} className="mt-4 w-full">
              <FaPlus className="mr-2" /> Add Activity
            </Button>
          )}
          {selectedActivity && (
            <ActivityModal
              activity={selectedActivity}
              isOpen={!!selectedActivity}
              onClose={handleCloseModal}
              onUpdate={handleUpdateActivity}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default WorkPackageColumn;
