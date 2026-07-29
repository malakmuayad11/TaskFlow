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
    console.log("collapsed");
  }

  return (
    <div
      className="md:grid min-h-screen grid-rows-[auto_1fr] transition-[grid-template-columns]"
      style={{
        gridTemplateColumns: isCollapsed
          ? "0px minmax(0,1fr)"
          : "240px minmax(0,1fr)",
      }}
    >
      <Aside isCollapsed={isCollapsed} onCollapseClick={handleCollapseClick} />
      <Header onCollapseClick={handleCollapseClick} />

      <main className={`row-span-2 bg-bg-main p-4 container mx-auto`}>
        <Outlet />
      </main>
    </div>
  );
}
