import { Outlet } from "react-router";
import { useState } from "react";
import Aside from "~/components/Aside";
import Header from "~/components/Header";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );

  function handleCollapseClick() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <div
      className={`grid min-h-screen ${
        isCollapsed
          ? "md:grid-cols-[minmax(0,1fr)]"
          : "md:grid-cols-[240px_minmax(0,1fr)]"
      }`}
    >
      <Aside isCollapsed={isCollapsed} onCollapseClick={handleCollapseClick} />
      <Header onCollapseClick={handleCollapseClick} />

      <main
        className={`row-span-2 min-h-screen ${!isCollapsed ? "md:col-start-2" : ""}`}
      >
        <Outlet />
      </main>
    </div>
  );
}
