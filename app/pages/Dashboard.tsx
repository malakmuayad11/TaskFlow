import Aside from "../components/Aside";
import Header from "../components/Header";
import Statistics from "../components/statistics/Statistics";
import RecentTasksCard from "../components/TasksOverview/RecentTasksCard";
import TasksOverview from "../components/TasksOverview/TasksOverview";
import { getTasksByUserId } from "../services/indexedDB/taskService";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Settings from "./Settings";
import Tasks from "./Tasks";
import { TasksContext } from "../context/TasksContext";

export default function Dashboard() {
  const userId = useContext(UserContext)?.user?.userId;
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);
  const setTasks = useContext(TasksContext).setTasks;

  useEffect(() => {
    async function loadTasks() {
      if (!userId) return;

      try {
        const result = await getTasksByUserId(userId);
        setTasks(result);
        console.log("Tasks are loaded");
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }

    loadTasks();
  }, [userId, setTasks]);

  function handleCollapseClick() {
    setIsCollapsed((prev) => !prev);
  }
  return (
    <div id="pageLayout">
      <Settings />
      <Tasks />
      <Aside isCollapsed={isCollapsed} onCollapseClick={handleCollapseClick} />
      <Header onCollapseClick={handleCollapseClick} />
      <h2>Dashboard</h2>
      <Statistics />
      <TasksOverview />
      <RecentTasksCard />
    </div>
  );
}
