import { useContext } from "react";
import type { Task } from "../../../types/Task";
import TaskItem from "../TaskItem";
import { ThemeContext } from "~/context/ThemeContext";
import { paginateArray } from "~/services/paginationService";
const now = Date.now();

export default function TasksDueSoonCard({ tasks }: { tasks: Task[] }) {
  const theme = useContext(ThemeContext).theme;

  const now = new Date();

  const dueSoonTasks = paginateArray(
    tasks.filter((task) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      const diffDays =
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

      return diffDays >= 0 && diffDays <= 3 && task.status !== "Completed";
    }),
    1,
    3,
  );

  return (
    <section
      className={`${
        theme === "Light"
          ? "bg-bg-surface border-border-color"
          : "bg-bg-surface-dark border-border-color-dark hover:shadow-primary/30"
      } border rounded-btn p-2 overflow-y-auto hover:shadow-lg duration-200`}
    >
      <h5 className="text-m font-medium mb-1">Tasks Due Soon</h5>
      {dueSoonTasks.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p>No tasks are ending soon.</p>
        </div>
      ) : (
        <table className="w-full">
          <tbody>
            {dueSoonTasks.map((task) => (
              <TaskItem {...task} key={task.taskId} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
