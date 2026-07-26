import type { Task } from "../../types/Task";

export default function TasksByPriorityCard({ tasks }: { tasks: Task[] }) {
  const highPriorityTasks: number = tasks.reduce(
    (count, task) => (task.priority === "High" ? count + 1 : count),
    0,
  );

  const mediumPriorityTasks: number = tasks.reduce(
    (count, task) => (task.priority === "Medium" ? count + 1 : count),
    0,
  );

  const lowPriorityTasks: number = tasks.reduce(
    (count, task) => (task.priority === "Low" ? count + 1 : count),
    0,
  );

  return (
    <section>
      <h2>Tasks by Priority</h2>
      <div>
        <div className="rounded-full w-3 h-3 bg-red-600"></div>
        <p>High</p>
        <p>{highPriorityTasks}</p>
      </div>
      <div>
        <div className="rounded-full w-3 h-3 bg-amber-600"></div>
        <p>Medium</p>
        <p>{mediumPriorityTasks}</p>
      </div>
      <div>
        <div className="rounded-full w-3 h-3 bg-green-600"></div>
        <p>Low</p>
        <p>{lowPriorityTasks}</p>
      </div>
    </section>
  );
}
