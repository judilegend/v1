import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import {
  addTache,
  updateTache,
  removeTache,
  fetchTaches,
} from "../../store/slices/tacheSlice";
import { AppDispatch } from "../../store";

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
  const dispatch = useDispatch<AppDispatch>();
  const [editedActivity, setEditedActivity] = useState<Activity>({
    ...activity,
    tasks: activity.tasks || [],
  });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchTaches(parseInt(activity.id))).then((resultAction) => {
        if (fetchTaches.fulfilled.match(resultAction)) {
          setEditedActivity({ ...activity, tasks: resultAction.payload });
        }
      });
    }
  }, [isOpen, activity.id, dispatch]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedActivity({ ...editedActivity, description: e.target.value });
  };

  const handleAddTask = async (title: string) => {
    try {
      const newTask: Omit<Task, "id"> = {
        title,
        description: "",
        status: "todo",
        assignedTo: null,
        activiteId: editedActivity.id,
      };
      const resultAction = await dispatch(addTache(newTask));
      if (addTache.fulfilled.match(resultAction)) {
        const createdTask = resultAction.payload;
        setEditedActivity({
          ...editedActivity,
          tasks: [...editedActivity.tasks, createdTask],
        });
        onAddTask(editedActivity.id, createdTask);
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }
    setIsAddingTask(false);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const resultAction = await dispatch(removeTache(parseInt(taskId)));
      if (removeTache.fulfilled.match(resultAction)) {
        setEditedActivity({
          ...editedActivity,
          tasks: editedActivity.tasks.filter((task) => task.id !== taskId),
        });
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleTaskDescriptionChange = async (
    taskId: string,
    description: string
  ) => {
    try {
      const resultAction = await dispatch(
        updateTache({ id: parseInt(taskId), tache: { description } })
      );
      if (updateTache.fulfilled.match(resultAction)) {
        setEditedActivity({
          ...editedActivity,
          tasks: editedActivity.tasks.map((task) =>
            task.id === taskId ? { ...task, description } : task
          ),
        });
      }
    } catch (error) {
      console.error("Failed to update task description:", error);
    }
  };

  const handleAssignTask = async (taskId: string, userId: string) => {
    try {
      const resultAction = await dispatch(
        updateTache({ id: parseInt(taskId), tache: { assignedTo: userId } })
      );
      if (updateTache.fulfilled.match(resultAction)) {
        setEditedActivity({
          ...editedActivity,
          tasks: editedActivity.tasks.map((task) =>
            task.id === taskId ? { ...task, assignedTo: userId } : task
          ),
        });
      }
    } catch (error) {
      console.error("Failed to assign task:", error);
    }
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

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-yellow-200 text-yellow-800";
      case "in_progress":
        return "bg-blue-200 text-blue-800";
      case "done":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const TaskStatusBadge: React.FC<{ status: string }> = ({ status }) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${getTaskStatusColor(
        status
      )}`}
    >
      {status.replace("_", " ")}
    </span>
  );

  const handleTaskStatusChange = async (taskId: string, status: string) => {
    try {
      const resultAction = await dispatch(
        updateTache({ id: parseInt(taskId), tache: { status } })
      );
      if (updateTache.fulfilled.match(resultAction)) {
        setEditedActivity({
          ...editedActivity,
          tasks: editedActivity.tasks.map((task) =>
            task.id === taskId ? { ...task, status } : task
          ),
        });
      }
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleTaskPriorityChange = async (taskId: string, priority: string) => {
    try {
      const resultAction = await dispatch(
        updateTache({ id: parseInt(taskId), tache: { priority } })
      );
      if (updateTache.fulfilled.match(resultAction)) {
        setEditedActivity({
          ...editedActivity,
          tasks: editedActivity.tasks.map((task) =>
            task.id === taskId ? { ...task, priority } : task
          ),
        });
      }
    } catch (error) {
      console.error("Failed to update task priority:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editedActivity.title || `Activity ${editedActivity.id}`}
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
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
              <div className="flex items-center mt-2">
                <span className="mr-2">Status:</span>
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleTaskStatusChange(task.id, e.target.value)
                  }
                  className="border rounded p-1"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <TaskStatusBadge status={task.status} />
              </div>
              <div className="flex items-center mt-2">
                <span className="mr-2">Priority:</span>
                <select
                  value={task.priority || "medium"}
                  onChange={(e) =>
                    handleTaskPriorityChange(task.id, e.target.value)
                  }
                  className="border rounded p-1"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
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

export default ActivityModal;
