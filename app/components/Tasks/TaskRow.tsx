import type { TaskStatus, TaskPriority } from "../../types/Task";
import TaskItem from "./TaskItem";
import editIcon from "../../assets/edit-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
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
        <td className="md:p-4">
          <button onClick={onEdit} className="md:mx-2 mr-2 md:-translate-x-4">
            <img
              className="w-5 h-5 cursor-pointer"
              src={editIcon}
              alt="Edit button icon"
            />
          </button>
          <button
            className="w-5 h-5 cursor-pointer md:-translate-x-2"
            onClick={onDelete}
          >
            <img src={deleteIcon} alt="Delete button icon" />
          </button>
        </td>
      }
    />
  );
}
