import { useEffect } from "react";
import { getTasksByUserId } from "~/services/indexedDB/taskService";
import type { Task } from "~/types/Task";

export function useLoadTasks(
  userId: number | null,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
) {
  useEffect(() => {
    async function loadTasks() {
      if (!userId) return;

      try {
        const result = await getTasksByUserId(userId);
        setTasks(result);
        console.log("Tasks are loaded");
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }

    loadTasks();
  }, [userId]);
}
