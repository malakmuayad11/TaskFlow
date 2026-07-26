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
    <table>
      <thead>
        <tr>
          <th>Recent Tasks</th>
        </tr>
      </thead>
      <tbody>
        {getRecentTasks().map((task) => (
          <TaskItem key={task.taskId} {...task} />
        ))}
      </tbody>
    </table>
  );
}
