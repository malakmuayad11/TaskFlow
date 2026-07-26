import { Outlet } from "react-router";
import DashboardPage from "~/pages/Dashboard";

export default function Dashboard() {
  return (
    <>
      <DashboardPage />
      <Outlet />
    </>
  );
}
