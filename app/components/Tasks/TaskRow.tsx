import type { TaskStatus, TaskPriority } from "../../types/Task";
import TaskItem from "./TaskItem";
interface TaskRowProps {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskRow({
  title,
  status,
  priority,
  dueDate,
  onEdit,
  onDelete,
}: TaskRowProps) {
  return (
    <TaskItem
      title={title}
      status={status}
      priority={priority}
      dueDate={dueDate}
      additionalData={
        <td>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </td>
      }
    />
  );
}
