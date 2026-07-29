import Statistics from "../components/statistics/Statistics";
import RecentTasksCard from "../components/TasksOverview/RecentTasksCard";
import TasksOverview from "../components/TasksOverview/TasksOverview";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { TasksContext } from "../context/TasksContext";
import { useLoadTasks } from "~/hooks/useLoadTasks";

export default function Dashboard() {
  const userId = useContext(UserContext)?.user?.userId;
  const setTasks = useContext(TasksContext).setTasks;

  if (userId) useLoadTasks(userId, setTasks);

  return (
    <div className="mt-2">
      <h2 className="text-3xl font-semibold">Dashboard</h2>
      <Statistics />
      <TasksOverview />
      <RecentTasksCard />
    </div>
  );
}
