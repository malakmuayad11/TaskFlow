import TaskRow from "./TaskRow";
import type { Task } from "../../types/Task";
import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

type TasksTableProps = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
};

export default function TasksTable({
  tasks,
  onDelete,
  onEdit,
}: TasksTableProps) {
  const theme = useContext(ThemeContext).theme;
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-m font-medium">
          <th className="pb-4">Task</th>
          <th className="pb-4">Status</th>
          <th className="pb-4">Due Date</th>
          <th className="pb-4">Priority</th>
          <th className="pb-4">Actions</th>
        </tr>
      </thead>

      <tbody
        className={`${
          theme === "Light"
            ? "bg-bg-surface border-border-color"
            : "bg-bg-surface-dark border-border-color-dark"
        } border`}
      >
        {tasks.map((task) => (
          <TaskRow
            key={task.taskId}
            {...task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.taskId)}
          />
        ))}
      </tbody>
    </table>
  );
}
