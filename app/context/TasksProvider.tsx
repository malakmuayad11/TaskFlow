import { TasksContext } from "./TasksContext";
import { useState, type ReactNode, useContext } from "react";
import type { Task } from "../types/Task.ts";
import { useLoadTasks } from "../hooks/useLoadTasks";
import { UserContext } from "./UserContext";

export default function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const userId = useContext(UserContext)?.user?.userId;

  useLoadTasks(userId ?? null, setTasks);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
