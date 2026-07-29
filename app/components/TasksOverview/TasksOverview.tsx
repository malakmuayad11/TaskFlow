import TasksCompletionCard from "./TasksCompletionCard";
import TasksByPriorityCard from "./TasksByPriorityCard";
import TasksDueSoonCard from "./TasksDueSoonCard";
import { TasksContext } from "../../context/TasksContext";
import { useContext } from "react";

export default function TasksOverview() {
  const tasks = useContext(TasksContext).tasks;
  return (
    <section className="mt-1.5 border border-border-color rounded-btn p-2">
      <h4 className="mb-1.5 text-xl font-semibold">Tasks Overview</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        <TasksCompletionCard tasks={tasks} />
        <TasksByPriorityCard tasks={tasks} />
        <TasksDueSoonCard tasks={tasks} />
      </div>
    </section>
  );
}
