import type { ReactElement } from "react";
import type { TaskStatus, TaskPriority } from "../../types/Task";

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
  const parsedDueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
  const formattedDate = Number.isNaN(parsedDueDate.getTime())
    ? "Invalid date"
    : parsedDueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });

  const badgeClass = "inline-block text-sm border rounded-[10px] p-0.75 m-0.75";
  const highPriorityClass =
    badgeClass + " border-red-600 bg-red-100 text-red-600";
  const mediumPriorityClass =
    badgeClass + " border-amber-600 bg-amber-100 text-amber-600";
  const lowPriorityClass = // It is used for low priority and completed status
    badgeClass + " border-green-600 bg-green-100 text-green-600";

  const inProgress =
    badgeClass + " bg-blue-100 border-blue-600 text-blue-600 translate-y-3";

  const completedClass = lowPriorityClass + " translate-y-3";

  const toDoClass =
    badgeClass + " bg-gray-200 border-gray-600 text-gray-600 translate-y-3";

  return (
    <tr className=" border-b border-b-border-color w-full">
      <td className="text-sm p-2">{title}</td>
      {status && (
        <td
          className={
            status === "Completed"
              ? completedClass
              : status === "Todo"
                ? toDoClass
                : inProgress
          }
        >
          {status === "In Progress" ? "Progress" : status}
        </td>
      )}
      <td className="text-sm text-text-secondary">{formattedDate}</td>
      <td>
        <span
          className={
            priority === "High"
              ? highPriorityClass
              : priority === "Medium"
                ? mediumPriorityClass
                : lowPriorityClass
          }
        >
          {priority}
        </span>
      </td>
      {additionalData}
    </tr>
  );
}
