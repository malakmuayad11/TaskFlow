import type { ReactElement } from "react";
import type { TaskStatus, TaskPriority } from "../../types/Task";
import Badge from "../Badge";

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

  return (
    <tr className=" border-b border-b-border-color w-full">
      <td className="text-sm p-2">{title}</td>
      {status && (
        <td>
          <Badge variant={status === "In Progress" ? "Progress" : status} />
        </td>
      )}
      <td className="text-sm text-text-secondary">{formattedDate}</td>
      <td>
        <Badge variant={priority} />
        {/* <span
          className={
            priority === "High"
              ? highPriorityClass
              : priority === "Medium"
                ? mediumPriorityClass
                : lowPriorityClass
          }
        >
          {priority}
        </span> */}
      </td>
      {additionalData}
    </tr>
  );
}
