import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";
import { Activity, Task } from "../../types/Kanban";
import {
  FaPlus,
  FaTrash,
  FaTasks,
  FaUserPlus,
  FaPaperclip,
} from "react-icons/fa";
import AddItemForm from "../kanban/AddItemForm";

interface ActivityModalProps {
  activity: Activity;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedActivity: Activity) => void;
  onAddTask: (activityId: string, newTask: Task) => void;
  users: { id: string; name: string }[];
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  activity,
  isOpen,
  onClose,
  onUpdate,
  onAddTask,
  users,
}) => {
  const navigate = useNavigate();
  const [editedActivity, setEditedActivity] = useState<Activity>(activity);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedActivity({ ...editedActivity, description: e.target.value });
  };

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: "",
      status: "todo",
      assignedTo: null,
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

  const handleTaskDescriptionChange = (taskId: string, description: string) => {
    setEditedActivity({
      ...editedActivity,
      tasks: editedActivity.tasks.map((task) =>
        task.id === taskId ? { ...task, description } : task
      ),
    });
  };

  const handleAssignTask = (taskId: string, userId: string) => {
    setEditedActivity({
      ...editedActivity,
      tasks: editedActivity.tasks.map((task) =>
        task.id === taskId ? { ...task, assignedTo: userId } : task
      ),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    onUpdate(editedActivity);
    onClose();
  };

  const handleManageTasks = () => {
    navigate(`/task-management/${editedActivity.id}`);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editedActivity.title || `Activity ${editedActivity.id}`}
    >
      <div className="space-y-4">
        <Input
          value={editedActivity.title || ""}
          onChange={(e) =>
            setEditedActivity({ ...editedActivity, title: e.target.value })
          }
          placeholder="Enter activity title"
          className="w-full"
        />

        <Textarea
          value={editedActivity.description || ""}
          onChange={handleDescriptionChange}
          placeholder="Enter activity description"
          className="w-full"
        />

        <div>
          <h3 className="text-lg font-semibold mb-2">Attachments</h3>
          <div className="flex items-center space-x-2">
            <Input type="file" onChange={handleFileChange} />
            <Button
              onClick={() => {
                /* Handle file upload */
              }}
              variant="secondary"
            >
              <FaPaperclip className="mr-2" /> Upload
            </Button>
          </div>
          {selectedFile && (
            <p className="mt-2">Selected file: {selectedFile.name}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Tasks ({editedActivity.tasks.length})
          </h3>
          {editedActivity.tasks.map((task) => (
            <div key={task.id} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{task.title}</span>
                <div className="space-x-2">
                  <Button
                    onClick={() => handleDeleteTask(task.id)}
                    variant="primary"
                  >
                    <FaTrash />
                  </Button>
                  <select
                    value={task.assignedTo || ""}
                    onChange={(e) => handleAssignTask(task.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="">Assign to...</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Textarea
                value={task.description || ""}
                onChange={(e) =>
                  handleTaskDescriptionChange(task.id, e.target.value)
                }
                placeholder="Enter task description"
                className="w-full mt-2"
              />
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

        <Button
          onClick={handleManageTasks}
          variant="secondary"
          className="w-full"
        >
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
