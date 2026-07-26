import { TasksContext } from "./TasksContext";
import { useState, type ReactNode } from "react";
import type { Task } from "../types/Task.ts";

export default function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
