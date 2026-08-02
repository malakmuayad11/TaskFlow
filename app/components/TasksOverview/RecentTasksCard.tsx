import TaskItem from "../Tasks/TaskItem";
import type { Task } from "../../types/Task";
import { TasksContext } from "../../context/TasksContext";
import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

export default function RecentTasksCard() {
  const theme = useContext(ThemeContext).theme;
  const tasks = useContext(TasksContext).tasks;

  function getRecentTasks(): Task[] {
    switch (tasks.length) {
      case 0:
        return [];
      case 1:
        return tasks.slice(-1);
      case 2:
        return tasks.slice(-2);
      default:
        return tasks.slice(-3);
    }
  }

  return (
    <section
      className={`${theme === "Light" ? "bg-bg-surface border-border-color" : "bg-bg-surface-dark border-border-color-dark"} border rounded-btn p-2 mt-2 hover:shadow-lg duration-200`}
    >
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-m font-medium">Recent Tasks</th>
          </tr>
        </thead>
        <tbody>
          {getRecentTasks().map((task) => (
            <TaskItem key={task.taskId} {...task} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
