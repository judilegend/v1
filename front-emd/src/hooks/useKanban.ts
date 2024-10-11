import { useState, useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { ProductBacklog, WorkPackage, Activity, Task } from "../types/Kanban";

const useKanbanBoard = () => {
  const [backlog, setBacklog] = useState<ProductBacklog>({
    id: "1",
    title: "Product Backlog",
    workPackages: [],
  });

  const handleDragEnd = useCallback((result: DropResult) => {
    // Implement drag and drop logic here
  }, []);

  const addWorkPackage = useCallback((title: string) => {
    const newWorkPackage: WorkPackage = {
      id: Date.now().toString(),
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
      id: Date.now().toString(),
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
        id: Date.now().toString(),
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

  return {
    backlog,
    handleDragEnd,
    addWorkPackage,
    addActivity,
    addTask,
    updateTask,
    deleteTask,
  };
};

export default useKanbanBoard;
