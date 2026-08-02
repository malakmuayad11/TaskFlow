import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { deleteCookies } from "~/services/cookiesService";
import Li from "./Li";
import Logo from "../assets/logo.png";
import homeIconLight from "../assets/home-icon-light.svg";
import homeIconDark from "../assets/home-icon-dark.svg";
import tasksIconLight from "../assets/tasks-icon-light.svg";
import tasksIconDark from "../assets/tasks-icon-dark.svg";
import settingsIconLight from "../assets/settings-icon-light.svg";
import settingsIconDark from "../assets/settings-icon-dark.svg";
import logoutIconDark from "../assets/logout-icon-dark.svg";
import logoutIconLight from "../assets/logout-icon-light.svg";
import { ThemeContext } from "~/context/ThemeContext";

export default function Aside({
  isCollapsed,
  onCollapseClick,
}: {
  isCollapsed: boolean;
  onCollapseClick: () => void;
}) {
  const setUser = useContext(UserContext)?.setUser;
  const theme = useContext(ThemeContext).theme;
  const navigator = useNavigate();

  function logout() {
    setUser?.(null);
    deleteCookies("userId");
    navigator("/");
  }

  return (
    <>
      <aside
        id="sideMenu"
        className={`flex flex-col row-span-2 overflow-hidden border-r fixed md:static top-0 left-0 min-h-screen ${theme === "Light" ? "bg-bg-surface text-text-primary border-border-color" : "bg-bg-surface-dark text-text-primary-dark border-border-color-dark"} z-50 transform transition-all duration-300 ease-in-out ${
          isCollapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        }`}
      >
        <div className="p-4">
          <h1 className="flex items-center gap-2 font-semibold text-xl">
            <img
              src={Logo}
              loading="eager"
              alt="Logo icon"
              className="w-5 h-5"
            />
            <span className="leading-none">TaskFlow</span>
          </h1>
        </div>

        <nav className="m-2 flex flex-col justify-between flex-1">
          <ul className="flex flex-col gap-2">
            <Li
              to="/dashboard"
              content="Dashboard"
              activeImgSrc={homeIconLight}
              inActiveImgSrc={theme === "Light" ? homeIconDark : homeIconLight}
            />
            <Li
              to="/dashboard/tasks"
              content="Tasks"
              activeImgSrc={tasksIconLight}
              inActiveImgSrc={
                theme === "Light" ? tasksIconDark : tasksIconLight
              }
            />
            <Li
              to="/dashboard/settings"
              content="Settings"
              activeImgSrc={settingsIconLight}
              inActiveImgSrc={
                theme === "Light" ? settingsIconDark : settingsIconLight
              }
            />
          </ul>
        </nav>
        <button
          className="items-end flex gap-1 ml-3 mb-2 hover:cursor-pointer"
          onClick={logout}
        >
          <img
            src={theme === "Light" ? logoutIconDark : logoutIconLight}
            alt="Logout icon"
            loading="eager"
          />
          Logout
        </button>
      </aside>
      <div
        onClick={onCollapseClick}
        id="overlay"
        className={`z-40 fixed inset-0 bg-black/50 ${isCollapsed ? "hidden" : "md:hidden"}`}
      />
    </>
  );
}
