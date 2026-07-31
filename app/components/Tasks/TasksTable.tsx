import TaskRow from "./TaskRow";
import type { Task } from "../../types/Task";

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
  return (
    <table className="w-full">
      <thead className="">
        <tr className="text-left text-m font-medium">
          <th className="pb-4">Task</th>
          <th className="pb-4">Status</th>
          <th className="pb-4">Due Date</th>
          <th className="pb-4">Priority</th>
          <th className="pb-4">Actions</th>
        </tr>
      </thead>

      <tbody className="bg-bg-surface border-border-color border">
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
