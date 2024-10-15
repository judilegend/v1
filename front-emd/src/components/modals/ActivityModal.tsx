import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Activity, Task } from '../../types/Kanban';
import { FaPlus, FaTrash, FaTasks } from 'react-icons/fa';
import AddItemForm from '../kanban/AddItemForm';

interface ActivityModalProps {
  activity: Activity;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedActivity: Activity) => void;
  onAddTask: (activityId: string, newTask: Task) => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  activity,
  isOpen,
  onClose,
  onUpdate,
  onAddTask,
}) => {
  const navigate = useNavigate();
  const [editedActivity, setEditedActivity] = useState<Activity>(activity);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextareaElement>
  ) => {
    setEditedActivity({ ...editedActivity, description: e.target.value });
  };

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: "",
      status: "todo",
    };
    setEditedActivity({
      ...editedActivity,
      tasks: [...editedActivity.tasks, newTask],
    });
    onAddTask(editedActivity.id, newTask);
    setIsAddingTask(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setEditedActivity({
      ...editedActivity,
      tasks: editedActivity.tasks.filter((task) => task.id !== taskId),
    });
  };

  const handleSave = () => {
    onUpdate(editedActivity);
    onClose();
  };

  const handleManageTasks = () => {
    navigate(`/task-management/${activity.id}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editedActivity.title}>
      <div className="space-y-4">
        <Textarea
          value={editedActivity.description || ""}
          onChange={handleDescriptionChange}
          placeholder="Enter activity description"
        />

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Tasks ({editedActivity.tasks.length})
          </h3>
          {editedActivity.tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center mb-2"
            >
              <span>{task.title}</span>
              <Button onClick={() => handleDeleteTask(task.id)} variant="icon">
                <FaTrash />
              </Button>
            </div>
          ))}
          {isAddingTask ? (
            <AddItemForm
              onAdd={handleAddTask}
              placeholder="Enter Task Title"
              onCancel={() => setIsAddingTask(false)}
            />
          ) : (
            <Button
              onClick={() => setIsAddingTask(true)}
              variant="secondary"
              className="w-full"
            >
              <FaPlus className="mr-2" /> Add Task
            </Button>
          )}
        </div>
        
        <Button onClick={handleManageTasks} variant="secondary" className="w-full">
          <FaTasks className="mr-2" /> Manage Tasks
        </Button>
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