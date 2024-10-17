import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Task, User } from "../types/Kanban";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Textarea";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

const TaskManagement: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dailyReport, setDailyReport] = useState("");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Fetch tasks and users data
    // This is a placeholder, replace with actual API calls
    setTasks([
      {
        id: "1",
        title: "Task 1",
        description: "Description 1",
        status: "todo",
        assignedTo: null,
      },
      {
        id: "2",
        title: "Task 2",
        description: "Description 2",
        status: "in_progress",
        assignedTo: null,
      },
    ]);
    setUsers([
      {
        id: "1",
        name: "User 1",
        email: "",
        role: "",
      },
      {
        id: "2",
        name: "User 2",
        email: "",
        role: "",
      },
    ]);
  }, [activityId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const assignTask = (taskId: string, userId: string) => {
    // Implement task assignment logic
  };

  const submitDailyReport = () => {
    // Implement daily report submission logic
  };

  const startPomodoro = () => setIsRunning(true);
  const pausePomodoro = () => setIsRunning(false);
  const stopPomodoro = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const renderEisenhowerQuadrant = () => {
    // Implement Eisenhower Quadrant rendering
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-100 p-4">Urgent and Important</div>
        <div className="bg-yellow-100 p-4">Important but Not Urgent</div>
        <div className="bg-blue-100 p-4">Urgent but Not Important</div>
        <div className="bg-green-100 p-4">Neither Urgent nor Important</div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Tasks</h2>
          {tasks.map((task) => (
            <div key={task.id} className="mb-2 p-2 border rounded">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <select onChange={(e) => assignTask(task.id, e.target.value)}>
                <option value="">Assign to</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Daily Report</h2>
          <Textarea
            value={dailyReport}
            onChange={(e) => setDailyReport(e.target.value)}
            placeholder="Enter your daily report"
          />
          <Button
            onClick={submitDailyReport}
            className="mt-2"
            variant={"primary"}
          >
            Submit Report
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Pomodoro Timer</h2>
        <div className="text-3xl font-bold mb-2">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
        <div className="space-x-2">
          <Button onClick={startPomodoro} variant={"secondary"}>
            <FaPlay />
          </Button>
          <Button onClick={pausePomodoro} variant={"secondary"}>
            <FaPause />
          </Button>
          <Button onClick={stopPomodoro} variant={"secondary"}>
            <FaStop />
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Eisenhower Quadrant</h2>
        {renderEisenhowerQuadrant()}
      </div>
    </div>
  );
};

export default TaskManagement;
