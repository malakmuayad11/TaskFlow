import { Outlet } from "react-router";
import { useContext, useState } from "react";
import Aside from "~/components/shared/Aside";
import Header from "~/components/shared/Header";
import { ThemeContext } from "~/context/ThemeContext";

export default function Dashboard() {
  const theme = useContext(ThemeContext).theme;
  const [isCollapsed, setIsCollapsed] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );

  function handleCollapseClick() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <div
      className={`${
        theme === "Light" ? "bg-bg-main" : "bg-bg-main-dark"
      } md:grid min-h-screen grid-rows-[auto_1fr] transition-[grid-template-columns]`}
      style={{
        gridTemplateColumns: isCollapsed
          ? "0px minmax(0,1fr)"
          : "240px minmax(0,1fr)",
      }}
    >
      <Aside isCollapsed={isCollapsed} onCollapseClick={handleCollapseClick} />
      <Header onCollapseClick={handleCollapseClick} />

      <main
        className={`row-span-2 ${
          theme === "Light"
            ? "bg-bg-main text-text-primary"
            : "bg-bg-main-dark text-text-primary-dark"
        } p-4 container mx-auto`}
      >
        <Outlet />
      </main>
    </div>
  );
}
