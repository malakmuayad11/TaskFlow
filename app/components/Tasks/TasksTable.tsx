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
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
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
