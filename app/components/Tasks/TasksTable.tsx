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
    <div
      className={`overflow-x-auto rounded-btn border ${
        theme === "Light" ? "border-border-color" : "border-border-color-dark"
      }`}
    >
      <table className="w-full min-w-[650px]">
        <thead>
          <tr
            className={`text-left text-sm lg:text-base font-medium ${
              theme === "Light" ? "text-text-primary" : "text-text-primary-dark"
            }`}
          >
            <th className="py-2 pl-2 whitespace-nowrap">Task</th>
            <th className="py-2 pt-2 whitespace-nowrap">Status</th>
            <th className="py-2 pt-2 whitespace-nowrap">Due Date</th>
            <th className="py-2 pt-2 whitespace-nowrap">Priority</th>
            <th className="py-2 pt-2 whitespace-nowrap">Actions</th>
          </tr>
        </thead>

        <tbody
          className={`${
            theme === "Light" ? "bg-bg-surface" : "bg-bg-surface-dark"
          }`}
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
    </div>
  );
}
