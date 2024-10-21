// import React, { useState } from 'react';
// import { Modal } from '../ui/Modal';
// import { Button } from '../ui/Button';
// import { Textarea } from '../ui/Textarea';
// import { WorkPackage, Activity, Task } from '../../types/Kanban';
// import { FaChevronDown, FaChevronRight, FaEdit, FaPlus, FaTasks, FaTrash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import AddItemForm from '../kanban/AddItemForm';

// interface WorkPackageModalProps {
//   workPackage: WorkPackage;
//   isOpen: boolean;
//   onClose: () => void;
//   onUpdate: (updatedWorkPackage: WorkPackage) => void;
// }

// export const WorkPackageModal: React.FC<WorkPackageModalProps> = ({
//   workPackage,
//   isOpen,
//   onClose,
//   onUpdate,
// }) => {
//   const [editedWorkPackage, setEditedWorkPackage] = useState<WorkPackage>(workPackage);
//   const [expandedActivities, setExpandedActivities] = useState<string[]>([]);
//   const navigate = useNavigate();

//   const toggleActivity = (activityId: string) => {
//     setExpandedActivities(prev =>
//       prev.includes(activityId)
//         ? prev.filter(id => id !== activityId)
//         : [...prev, activityId]
//     );
//   };

//   const handleDescriptionChange = (
//     value: string,
//     itemType: 'workPackage' | 'activity' | 'task',
//     activityId?: string,
//     taskId?: string
//   ) => {
//     setEditedWorkPackage(prev => {
//       if (itemType === 'workPackage') {
//         return { ...prev, description: value };
//       } else if (itemType === 'activity') {
//         return {
//           ...prev,
//           activities: prev.activities.map(activity =>
//             activity.id === activityId ? { ...activity, description: value } : activity
//           ),
//         };
//       } else {
//         return {
//           ...prev,
//           activities: prev.activities.map(activity => ({
//             ...activity,
//             tasks: activity.tasks.map(task =>
//               task.id === taskId ? { ...task, description: value } : task
//             ),
//           })),
//         };
//       }
//     });
//   };

//   const handleAddActivity = (title: string) => {
//     const newActivity: Activity = {
//       id: Date.now().toString(),
//       title,
//       description: '',
//       tasks: [],
//     };
//     setEditedWorkPackage(prev => ({
//       ...prev,
//       activities: [...prev.activities, newActivity],
//     }));
//   };

//   const handleAddTask = (activityId: string, title: string) => {
//     const newTask: Task = {
//       id: Date.now().toString(),
//       title,
//       description: '',
//       status: 'todo',
//     };
//     setEditedWorkPackage(prev => ({
//       ...prev,
//       activities: prev.activities.map(activity =>
//         activity.id === activityId
//           ? { ...activity, tasks: [...activity.tasks, newTask] }
//           : activity
//       ),
//     }));
//   };

//   const handleDeleteActivity = (activityId: string) => {
//     setEditedWorkPackage(prev => ({
//       ...prev,
//       activities: prev.activities.filter(activity => activity.id !== activityId),    }));
//   };

//   const handleDeleteTask = (activityId: string, taskId: string) => {
//     setEditedWorkPackage(prev => ({
//       ...prev,
//       activities: prev.activities.map(activity =>
//         activity.id === activityId
//           ? { ...activity, tasks: activity.tasks.filter(task => task.id !== taskId) }
//           : activity
//       ),
//     }));
//   };

//   const handleSave = () => {
//     onUpdate(editedWorkPackage);
//     onClose();
//   };

//   const handleManageTasks = (activityId: string) => {
//     navigate(`/tasks/${workPackage.id}/${activityId}`);
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title={editedWorkPackage.title}>
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold">Work Package Description</h3>
//           <Button onClick={() => {}} variant="icon">
//             <FaEdit />
//           </Button>
//         </div>
//         <Textarea
//           value={editedWorkPackage.description || ''}
//           onChange={(e) => handleDescriptionChange(e.target.value, 'workPackage')}
//           placeholder="Enter work package description"
//         />

//         <div>
//           <h3 className="text-lg font-semibold mb-2">Activities</h3>
//           {editedWorkPackage.activities.map((activity) => (
//             <div key={activity.id} className="mb-4 border rounded-lg p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center">
//                   <Button onClick={() => toggleActivity(activity.id)} variant="icon">
//                     {expandedActivities.includes(activity.id) ? <FaChevronDown /> : <FaChevronRight />}
//                   </Button>
//                   <h4 className="text-md font-medium ml-2">{activity.title}</h4>
//                 </div>
//                 <div>
//                   <Button onClick={() => {}} variant="icon" className="mr-2">
//                     <FaEdit />
//                   </Button>
//                   <Button onClick={() => handleManageTasks(activity.id)} variant="icon" className="mr-2">
//                     <FaTasks />
//                   </Button>
//                   <Button onClick={() => handleDeleteActivity(activity.id)} variant="icon">
//                     <FaTrash />
//                   </Button>
//                 </div>
//               </div>
//               {expandedActivities.includes(activity.id) && (
//                 <>
//                   <Textarea
//                     value={activity.description || ''}
//                     onChange={(e) => handleDescriptionChange(e.target.value, 'activity', activity.id)}
//                     placeholder="Enter activity description"
//                     className="mb-2"
//                   />
//                   <h5 className="text-sm font-medium mt-2 mb-1">Tasks</h5>
//                   {activity.tasks.map((task) => (
//                     <div key={task.id} className="ml-4 mb-2 flex items-center justify-between">
//                       <p className="text-sm font-medium">{task.title}</p>
//                       <div>
//                         <Button onClick={() => {}} variant="icon" className="mr-2">
//                           <FaEdit />
//                         </Button>
//                         <Button onClick={() => handleDeleteTask(activity.id, task.id)} variant="icon">
//                           <FaTrash />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                   <AddItemForm onAdd={(title) => handleAddTask(activity.id, title)} placeholder="Add Task" />
//                 </>
//               )}
//             </div>
//           ))}
//           <AddItemForm onAdd={handleAddActivity} placeholder="Add Activity" />
//         </div>
//       </div>

//       <div className="mt-6 flex justify-end space-x-2">
//         <Button onClick={onClose} variant="secondary">
//           Cancel
//         </Button>
//         <Button onClick={handleSave} variant="primary">
//           Save Changes
//         </Button>
//       </div>
//     </Modal>
//   );
// };
import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { WorkPackage, Activity, Task } from "../../types/Kanban";
import {
  FaChevronDown,
  FaChevronRight,
  FaEdit,
  FaPlus,
  FaTasks,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddItemForm from "../kanban/AddItemForm";

interface WorkPackageModalProps {
  workPackage: WorkPackage;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedWorkPackage: WorkPackage) => void;
}

export const WorkPackageModal: React.FC<WorkPackageModalProps> = ({
  workPackage,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [editedWorkPackage, setEditedWorkPackage] =
    useState<WorkPackage>(workPackage);
  const [expandedActivities, setExpandedActivities] = useState<string[]>([]);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const navigate = useNavigate();

  const toggleActivity = (activityId: string) => {
    setExpandedActivities((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleDescriptionChange = (
    value: string,
    itemType: "workPackage" | "activity" | "task",
    activityId?: string,
    taskId?: string
  ) => {
    setEditedWorkPackage((prev) => {
      if (itemType === "workPackage") {
        return { ...prev, description: value };
      } else if (itemType === "activity") {
        return {
          ...prev,
          activities: prev.activities.map((activity) =>
            activity.id === activityId
              ? { ...activity, description: value }
              : activity
          ),
        };
      } else {
        return {
          ...prev,
          activities: prev.activities.map((activity) => ({
            ...activity,
            tasks: activity.tasks.map((task) =>
              task.id === taskId ? { ...task, description: value } : task
            ),
          })),
        };
      }
    });
  };

  const handleAddActivity = (title: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      title,
      description: "",
      tasks: [],
      contributors: [],
    };
    setEditedWorkPackage((prev) => ({
      ...prev,
      activities: [...prev.activities, newActivity],
    }));
    setIsAddingActivity(false);
  };

  const handleAddTask = (activityId: string, title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: "",
      status: "todo",
      assignedTo: null,
    };
    setEditedWorkPackage((prev) => ({
      ...prev,
      activities: prev.activities.map((activity) =>
        activity.id === activityId
          ? { ...activity, tasks: [...activity.tasks, newTask] }
          : activity
      ),
    }));
  };

  const handleDeleteActivity = (activityId: string) => {
    setEditedWorkPackage((prev) => ({
      ...prev,
      activities: prev.activities.filter(
        (activity) => activity.id !== activityId
      ),
    }));
  };

  const handleDeleteTask = (activityId: string, taskId: string) => {
    setEditedWorkPackage((prev) => ({
      ...prev,
      activities: prev.activities.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              tasks: activity.tasks.filter((task) => task.id !== taskId),
            }
          : activity
      ),
    }));
  };

  const handleSave = () => {
    onUpdate(editedWorkPackage);
    onClose();
  };

  const handleManageTasks = (activityId: string) => {
    navigate(`/tasks/${workPackage.id}/${activityId}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editedWorkPackage.title}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Work Package Description</h3>
          <Button onClick={() => {}} variant="primary">
            <FaEdit />
          </Button>
        </div>
        <Textarea
          value={editedWorkPackage.description || ""}
          onChange={(e) =>
            handleDescriptionChange(e.target.value, "workPackage")
          }
          placeholder="Enter work package description"
        />

        <div>
          <h3 className="text-lg font-semibold mb-2">Activities</h3>
          {editedWorkPackage.activities.map((activity) => (
            <div key={activity.id} className="mb-4 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Button
                    onClick={() => toggleActivity(activity.id)}
                    variant="primary"
                    className="mr-2"
                  >
                    {expandedActivities.includes(activity.id) ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronRight />
                    )}
                  </Button>
                  <h4 className="text-md font-medium ml-2">{activity.title}</h4>
                </div>
                <div>
                  <Button onClick={() => {}} variant="primary" className="mr-2">
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => handleManageTasks(activity.id)}
                    variant="primary"
                    className="mr-2"
                  >
                    <FaTasks />
                  </Button>
                  <Button
                    onClick={() => handleDeleteActivity(activity.id)}
                    variant="primary"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
              {expandedActivities.includes(activity.id) && (
                <>
                  <Textarea
                    value={activity.description || ""}
                    onChange={(e) =>
                      handleDescriptionChange(
                        e.target.value,
                        "activity",
                        activity.id
                      )
                    }
                    placeholder="Enter activity description"
                    className="mb-2"
                  />
                  <h5 className="text-sm font-medium mt-2 mb-1">Tasks</h5>
                  {activity.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="ml-4 mb-2 flex items-center justify-between"
                    >
                      <p className="text-sm font-medium">{task.title}</p>
                      <div>
                        <Button
                          onClick={() => {}}
                          variant="primary"
                          className="mr-2"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          onClick={() => handleDeleteTask(activity.id, task.id)}
                          variant="primary"
                          className="mr-2"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <AddItemForm
                    onAdd={(title) => handleAddTask(activity.id, title)}
                    placeholder="Add Task"
                    onCancel={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </>
              )}
            </div>
          ))}
          {isAddingActivity ? (
            <AddItemForm
              onAdd={handleAddActivity}
              placeholder="Enter Activity Title"
              onCancel={() => setIsAddingActivity(false)}
            />
          ) : (
            <Button
              onClick={() => setIsAddingActivity(true)}
              variant="secondary"
              className="w-full"
            >
              <FaPlus className="mr-2" /> Add Activity
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="primary">
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};
