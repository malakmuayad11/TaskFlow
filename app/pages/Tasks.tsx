import TasksList from "../components/Tasks/TasksList";
import { useContext } from "react";
import { ViewContext } from "../context/ViewContext";
import { TasksContext } from "../context/TasksContext";
import TasksBoard from "../components/Tasks/TasksBoard";
import type { TaskStatus, TaskPriority } from "~/types/Task";

export default function Tasks({
  status,
  priority,
  includeControlBar = true,
}: {
  status?: TaskStatus;
  priority?: TaskPriority;
  includeControlBar?: boolean;
}) {
  const view = useContext(ViewContext).view;
  const tasks = useContext(TasksContext).tasks;

  const initialTasks = status
    ? tasks.filter((task) => task.status === status)
    : priority
      ? tasks.filter((task) => task.priority === priority)
      : tasks;

  return (
    <div>
      {view === "List" ? (
        <TasksList
          initialTasks={initialTasks}
          includeControlBar={includeControlBar}
        />
      ) : (
        <TasksBoard initialTasks={initialTasks} />
      )}
    </div>
  );
}
