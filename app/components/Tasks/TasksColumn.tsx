import TaskCard from "./TaskCard";
import type { Task, TaskStatus } from "../../types/Task";
import Badge from "../shared/Badge";
import type { Variant } from "../shared/Badge";
import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

type TasksColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  onAdd: () => void;
};

export default function TasksColumn({
  status,
  tasks,
  onAdd,
}: TasksColumnProps) {
  const theme = useContext(ThemeContext).theme;
  const tasksByStatus = tasks.filter((task) => task.status === status);

  const style = `bg-linear-to-b ${
    theme === "Light"
      ? "via-white to-white"
      : "via-bg-surface-dark to-bg-surface-dark"
  } border-t-2 rounded-2xl p-4 shadow-sm `;

  const completedStyle = style + "from-green-500/10 border-green-500";

  const inProgressStyle = style + "from-blue-500/10 border-blue-500";

  const todoStyle = style + "from-gray-500/10 border-gray-500";

  return (
    <section>
      <div
        className={
          status === "Completed"
            ? completedStyle
            : status === "In Progress"
              ? inProgressStyle
              : todoStyle
        }
      >
        <div className="flex justify-between mb-2">
          <h3 className="text-lg font-bold">{status}</h3>
          <Badge
            variant={
              status === "In Progress" ? "Progress" : (status as Variant)
            }
            content={tasksByStatus.length.toString()}
            additionalStyle="w-6 h-6 text-center"
          />
        </div>
        {tasksByStatus.map((task) => (
          <TaskCard
            key={task.taskId}
            title={task.title}
            dueDate={task.dueDate}
            priority={task.priority}
          />
        ))}
        <button
          className={`w-full font-bold text-primary ${
            theme === "Light"
              ? "bg-bg-surface border-border-color"
              : "bg-bg-surface-dark border-border-color-dark"
          }
           border rounded-btn mt-2 cursor-pointer hover:opacity-70 duration-200 p-2`}
          onClick={onAdd}
        >
          + Add Task
        </button>
      </div>
    </section>
  );
}
