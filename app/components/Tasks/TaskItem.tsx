import { useContext, useState, type ReactElement } from "react";
import type { TaskStatus, TaskPriority, Task } from "../../types/Task";
import Badge from "../shared/Badge";
import { ThemeContext } from "~/context/ThemeContext";
import { TasksContext } from "~/context/TasksContext";
import { updateTask } from "~/services/indexedDB/taskService";

interface TaskItemProps {
  id: number;
  title: string;
  status?: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  enableCheck: boolean;
  additionalData?: ReactElement;
}

export default function TaskItem({
  id,
  title,
  status,
  priority,
  dueDate,
  enableCheck = true,
  additionalData,
}: TaskItemProps) {
  const theme = useContext(ThemeContext).theme;
  const tasks = useContext(TasksContext).tasks;
  const parsedDueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
  const formattedDate = Number.isNaN(parsedDueDate.getTime())
    ? "Invalid date"
    : parsedDueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });

  const [checked, setChecked] = useState(status === "Completed");

  async function handleCheckChange() {
    if (enableCheck === false) return;

    const nextChecked = !checked;
    setChecked(nextChecked);
    const task = tasks.find((t) => t.taskId === id);
    if (task) {
      await updateTask({
        taskId: id,
        title: title,
        status: nextChecked ? "Completed" : "Todo",
        priority: priority,
        dueDate: dueDate,
        userId: task.userId,
      });
    }
  }

  return (
    <tr
      className={`border-b ${
        theme === "Light"
          ? "border-b-border-color"
          : "border-b-border-color-dark"
      } w-full`}
    >
      <td className="text-sm p-2 flex items-center gap-2 mt-3">
        <input
          type="checkbox"
          value={title}
          checked={checked}
          onChange={handleCheckChange}
          className="accent-primary"
        />
        <label className={`${checked ? "line-through" : ""}`}>{title}</label>
      </td>
      {status && (
        <td>
          <Badge
            variant={
              checked
                ? "Completed"
                : status === "In Progress"
                  ? "Progress"
                  : "Todo"
            }
          />
        </td>
      )}
      <td
        className={`text-sm ${
          theme === "Light" ? "text-text-secondary" : "text-text-secondary-dark"
        }`}
      >
        {formattedDate}
      </td>
      <td>
        <Badge variant={priority} />
      </td>
      {additionalData}
    </tr>
  );
}
