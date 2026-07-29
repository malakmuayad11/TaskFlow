import type { Task } from "../../types/Task";
import PriorityItem from "./PriorityItem";

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
    <section className="flex flex-col gap-3 p-2 bg-bg-surface border border-border-color rounded-btn hover:shadow-lg duration-200">
      <h5 className="text-m font-medium">Tasks by Priority</h5>
      <PriorityItem priority="High" tasksNumber={highPriorityTasks} />
      <PriorityItem priority="Medium" tasksNumber={mediumPriorityTasks} />
      <PriorityItem priority="Low" tasksNumber={lowPriorityTasks} />
    </section>
  );
}
