import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Task } from "../types/Task.ts";

type TasksContextType = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  setTasks: () => undefined,
});
