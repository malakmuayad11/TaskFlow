import type { Task } from "../../types/Task";
import TaskItem from "../Tasks/TaskItem";
const now = Date.now();

export default function TasksDueSoonCard({ tasks }: { tasks: Task[] }) {
  const dueSoonTasks = tasks.filter(
    (task) => task.dueDate.getTime() - now <= 3 * 60 * 60 * 24 * 1000,
  );
  return (
    <section className="bg-bg-surface border rounded-btn border-border-color p-2 overflow-y-auto hover:shadow-lg duration-200">
      <h5 className="text-m font-medium mb-1">Tasks Due Soon</h5>
      {dueSoonTasks.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p>No tasks are ending soon.</p>
        </div>
      ) : (
        <table className="w-full">
          <tbody>
            {dueSoonTasks.map((task) => (
              <TaskItem {...task} key={task.taskId} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
