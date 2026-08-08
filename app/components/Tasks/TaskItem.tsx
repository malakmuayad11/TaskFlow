import { useContext, useState, type ReactElement } from "react";
import type { TaskStatus, TaskPriority } from "../../types/Task";
import Badge from "../shared/Badge";
import { ThemeContext } from "~/context/ThemeContext";

interface TaskItemProps {
  title: string;
  status?: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  additionalData?: ReactElement;
}

export default function TaskItem({
  title,
  status,
  priority,
  dueDate,
  additionalData,
}: TaskItemProps) {
  const theme = useContext(ThemeContext).theme;
  const parsedDueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
  const formattedDate = Number.isNaN(parsedDueDate.getTime())
    ? "Invalid date"
    : parsedDueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });

  const [checked, setChecked] = useState(status === "Completed");

  function handleCheckChange() {
    setChecked(!checked);
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
