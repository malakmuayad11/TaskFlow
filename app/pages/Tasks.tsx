import TasksList from "../components/Tasks/TasksList";
import TasksHeader from "../components/Tasks/TasksHeader";
import { useContext } from "react";
import { ViewContext } from "../context/ViewContext";
import { TasksContext } from "../context/TasksContext";
import TasksBoard from "../components/Tasks/TasksBoard";

export default function Tasks() {
  const view = useContext(ViewContext).view;
  const tasks = useContext(TasksContext).tasks;

  return (
    <div>
      {view === "List" ? (
        <TasksList initialTasks={tasks} />
      ) : (
        <TasksBoard initialTasks={tasks} />
      )}
    </div>
  );
}
