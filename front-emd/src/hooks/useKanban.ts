import { useState, useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { Backlog, WorkPackage, Activity, Task } from "../types/Kanban";

const useKanbanBoard = () => {
  const [backlog, setBacklog] = useState<Backlog>({
    workPackages: [],
  });

  const handleDragEnd = useCallback((result: DropResult) => {
    // Implement drag and drop logic here
  }, []);

  const addWorkPackage = useCallback((title: string) => {
    const newWorkPackage: WorkPackage = {
      id: uuidv4(),
      title,
      description: "",
      activities: [],
    };
    setBacklog((prev) => ({
      ...prev,
      workPackages: [...prev.workPackages, newWorkPackage],
    }));
  }, []);

  const addActivity = useCallback((workPackageId: string, title: string) => {
    const newActivity: Activity = {
      id: uuidv4(),
      title,
      description: "",
      tasks: [],
    };
    setBacklog((prev) => ({
      ...prev,
      workPackages: prev.workPackages.map((wp) =>
        wp.id === workPackageId
          ? { ...wp, activities: [...wp.activities, newActivity] }
          : wp
      ),
    }));
  }, []);

  const addTask = useCallback(
    (workPackageId: string, activityId: string, title: string) => {
      const newTask: Task = {
        id: uuidv4(),
        title,
        description: "",
        status: "todo",
      };
      setBacklog((prev) => ({
        ...prev,
        workPackages: prev.workPackages.map((wp) =>
          wp.id === workPackageId
            ? {
                ...wp,
                activities: wp.activities.map((act) =>
                  act.id === activityId
                    ? { ...act, tasks: [...act.tasks, newTask] }
                    : act
                ),
              }
            : wp
        ),
      }));
    },
    []
  );

  const updateTask = useCallback(
    (
      workPackageId: string,
      activityId: string,
      taskId: string,
      updates: Partial<Task>
    ) => {
      setBacklog((prev) => ({
        ...prev,
        workPackages: prev.workPackages.map((wp) =>
          wp.id === workPackageId
            ? {
                ...wp,
                activities: wp.activities.map((act) =>
                  act.id === activityId
                    ? {
                        ...act,
                        tasks: act.tasks.map((task) =>
                          task.id === taskId ? { ...task, ...updates } : task
                        ),
                      }
                    : act
                ),
              }
            : wp
        ),
      }));
    },
    []
  );

  const deleteTask = useCallback(
    (workPackageId: string, activityId: string, taskId: string) => {
      setBacklog((prev) => ({
        ...prev,
        workPackages: prev.workPackages.map((wp) =>
          wp.id === workPackageId
            ? {
                ...wp,
                activities: wp.activities.map((act) =>
                  act.id === activityId
                    ? {
                        ...act,
                        tasks: act.tasks.filter((task) => task.id !== taskId),
                      }
                    : act
                ),
              }
            : wp
        ),
      }));
    },
    []
  );

  const updateWorkPackage = (updatedWorkPackage: WorkPackage) => {
    setBacklog((prevBacklog) => ({
      ...prevBacklog,
      workPackages: prevBacklog.workPackages.map((wp) =>
        wp.id === updatedWorkPackage.id ? updatedWorkPackage : wp
      ),
    }));
  };

  return {
    backlog,
    handleDragEnd,
    addWorkPackage,
    addActivity,
    addTask,
    updateTask,
    deleteTask,
    updateWorkPackage,
  };
};

export default useKanbanBoard;