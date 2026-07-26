import type { ReactElement } from "react";
import type { TaskStatus, TaskPriority } from "../../types/Task";

interface TaskItemProps {
  title: string;
  status: TaskStatus;
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
        month: "long",
        day: "2-digit",
      });

  return (
    <tr>
      <td>{title}</td>
      <td>{status}</td>
      <td>{priority}</td>
      <td>{formattedDate}</td>
      {additionalData}
    </tr>
  );
}
