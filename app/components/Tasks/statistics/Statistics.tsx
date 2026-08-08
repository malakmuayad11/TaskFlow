import StatCard from "./StatCard";
import { TasksContext } from "../../../context/TasksContext";
import { useContext } from "react";
import totalIcon from "../../../assets/total-icon.svg";
import completedIcon from "../../../assets/completed-icon.svg";
import pendingIcon from "../../../assets/pending-icon.svg";
import highPriorityIcon from "../../../assets/high-priority-icon.svg";
import { Link } from "react-router";

export default function Statistics() {
  const tasks = useContext(TasksContext).tasks;
  return (
    <section className="mt-2.5 grid md:grid-cols-4 grid-cols-2 gap-1 justify-center items-center">
      <Link to="/dashboard/tasks">
        <StatCard
          title="Total Tasks"
          statNumber={tasks.length}
          imageURL={totalIcon}
        />
      </Link>

      <Link to="/dashboard/tasks-completed">
        <StatCard
          title="Completed"
          statNumber={tasks.reduce(
            (count, task) => count + (task.status === "Completed" ? 1 : 0),
            0,
          )}
          imageURL={completedIcon}
        />
      </Link>
      <Link to="/dashboard/tasks-pending">
        <StatCard
          title="Pending"
          statNumber={tasks.reduce(
            (count, task) => count + (task.status === "Todo" ? 1 : 0),
            0,
          )}
          imageURL={pendingIcon}
        />
      </Link>
      <Link to="/dashboard/tasks-high-priority">
        <StatCard
          title="High Priority"
          statNumber={tasks.reduce(
            (count, task) => count + (task.priority === "High" ? 1 : 0),
            0,
          )}
          imageURL={highPriorityIcon}
        />
      </Link>
    </section>
  );
}
