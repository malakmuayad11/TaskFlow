import { useContext } from "react";
import type { Task } from "../../types/Task";
import PriorityItem from "./PriorityItem";
import { ThemeContext } from "~/context/ThemeContext";

export default function TasksByPriorityCard({ tasks }: { tasks: Task[] }) {
  const theme = useContext(ThemeContext).theme;

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
    <section
      className={`flex flex-col gap-3 p-2 ${
        theme === "Light"
          ? "bg-bg-surface border-border-color"
          : "bg-bg-surface-dark border-border-color-dark hover:shadow-primary/30"
      } border rounded-btn hover:shadow-lg duration-200`}
    >
      <h5 className="text-m font-medium">Tasks by Priority</h5>
      <PriorityItem priority="High" tasksNumber={highPriorityTasks} />
      <PriorityItem priority="Medium" tasksNumber={mediumPriorityTasks} />
      <PriorityItem priority="Low" tasksNumber={lowPriorityTasks} />
    </section>
  );
}
