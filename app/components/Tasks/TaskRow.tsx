import type { TaskStatus, TaskPriority } from "../../types/Task";
import TaskItem from "./TaskItem";
import editIconDark from "../../assets/edit-icon-dark.svg";
import editIconLight from "../../assets/edit-icon-light.svg";
import deleteIconDark from "../../assets/delete-icon-dark.svg";
import deleteIconLight from "../../assets/delete-icon-light.svg";
import { useContext, useState } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import ConfirmationDialog from "../settings/ConfirmationDialog";
interface TaskRowProps {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  onEdit: () => void;
  onDelete: () => void;
  enableCheck: boolean;
}

export default function TaskRow({
  id,
  title,
  status,
  priority,
  dueDate,
  onEdit,
  onDelete,
  enableCheck,
}: TaskRowProps) {
  const theme = useContext(ThemeContext).theme;
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    setIsDeleting(true);
  }

  return isDeleting ? (
    <tr className="w-full">
      <td className="p-2" colSpan={5}>
        <ConfirmationDialog
          message={`Are you sure you want to delete the ${title} task?`}
          onYesClick={onDelete}
          onNoClick={() => setIsDeleting(false)}
        />
      </td>
    </tr>
  ) : (
    <TaskItem
      enableCheck={enableCheck}
      id={id}
      title={title}
      status={status}
      priority={priority}
      dueDate={dueDate}
      additionalData={
        <td className="md:p-4">
          <button onClick={onEdit} className="md:mx-2 mr-2 md:-translate-x-4">
            <img
              className="w-5 h-5 cursor-pointer"
              src={theme === "Light" ? editIconDark : editIconLight}
              alt="Edit button icon"
            />
          </button>
          <button
            className="w-5 h-5 cursor-pointer md:-translate-x-2"
            onClick={handleDelete}
          >
            <img
              src={theme === "Light" ? deleteIconDark : deleteIconLight}
              alt="Delete button icon"
            />
          </button>
        </td>
      }
    />
  );
}
