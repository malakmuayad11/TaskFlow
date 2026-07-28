import { Outlet } from "react-router";
import { useState } from "react";
import Aside from "~/components/Aside";
import Header from "~/components/Header";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);

  function handleCollapseClick() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <div className="grid md:grid-cols-[auto_1fr] ">
      <Aside isCollapsed={isCollapsed} onCollapseClick={handleCollapseClick} />
      <Header onCollapseClick={handleCollapseClick} />

      <main className="row-span-2 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
