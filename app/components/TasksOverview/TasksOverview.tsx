import TasksCompletionCard from "./TasksCompletionCard";
import TasksByPriorityCard from "./TasksByPriorityCard";
import TasksDueSoonCard from "./TasksDueSoonCard";
import { TasksContext } from "../../context/TasksContext";
import { useContext } from "react";

export default function TasksOverview() {
  const tasks = useContext(TasksContext).tasks;
  return (
    <section>
      <h2>Tasks Overview</h2>
      <div>
        <TasksCompletionCard tasks={tasks} />
        <TasksByPriorityCard tasks={tasks} />
        <TasksDueSoonCard tasks={tasks} />
      </div>
    </section>
  );
}
