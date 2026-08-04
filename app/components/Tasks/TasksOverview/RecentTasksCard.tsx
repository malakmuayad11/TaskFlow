import TaskItem from "../TaskItem";
import type { Task } from "../../../types/Task";
import { TasksContext } from "../../../context/TasksContext";
import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

export default function RecentTasksCard() {
  const theme = useContext(ThemeContext).theme;
  const tasks = useContext(TasksContext).tasks;

  function getRecentTasks(): Task[] {
    switch (tasks.length) {
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
      className={`${
        theme === "Light"
          ? "bg-bg-surface border-border-color"
          : "bg-bg-surface-dark border-border-color-dark hover:shadow-primary/30"
      } border rounded-btn p-2 mt-2 hover:shadow-lg duration-200`}
    >
      {tasks.length === 0 ? (
        <>
          <h5 className="font-medium">Recent Tasks</h5>
          <p
            className={`${
              theme === "Light"
                ? "text-text-secondary"
                : "text-text-secondary-dark"
            }`}
          >
            No tasks are added recently.
          </p>
        </>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left font-medium">Recent Tasks</th>
            </tr>
          </thead>
          <tbody>
            {getRecentTasks().map((task) => (
              <TaskItem key={task.taskId} {...task} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
