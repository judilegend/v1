import { useState, useCallback } from "react";
import { Activity, Task } from "../types/kanban";

export const useActivities = (initialActivities: Activity[]) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const updateActivity = useCallback((updatedActivity: Activity) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
  }, []);

  const addTask = useCallback((activityId: string, newTask: Task) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId
          ? { ...activity, tasks: [...activity.tasks, newTask] }
          : activity
      )
    );
  }, []);

  return { activities, updateActivity, addTask };
};
