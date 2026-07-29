import TaskItem from "../Tasks/TaskItem";
import type { Task } from "../../types/Task";
import { TasksContext } from "../../context/TasksContext";
import { useContext } from "react";

export default function RecentTasksCard() {
  const tasks = useContext(TasksContext).tasks;

  function getRecentTasks(): Task[] {
    switch (tasks.length) {
      case 0:
        return [];
      case 1:
        return tasks.slice(-1);
      case 2:
        return tasks.slice(-2);
      default:
        return tasks.slice(-3);
    }
  }

  return (
    <section className="bg-bg-surface border border-border-color rounded-btn p-2 mt-2 hover:shadow-lg duration-200">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-m font-medium">Recent Tasks</th>
          </tr>
        </thead>
        <tbody>
          {getRecentTasks().map((task) => (
            <TaskItem key={task.taskId} {...task} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
