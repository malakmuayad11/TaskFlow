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
    <>
      <Header onCollapseClick={handleCollapseClick} />
      <Aside isCollapsed={isCollapsed} onCollapseClick={handleCollapseClick} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
