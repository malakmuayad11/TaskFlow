import { Outlet } from "react-router";
import Aside from "~/components/Aside";
import DashboardPage from "~/pages/Dashboard";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);

  function handleCollapseClick() {
    setIsCollapsed((prev) => !prev);
  }
  return (
    <>
      <Header />
      <Aside />
      <Outlet />
    </>
  );
}
