import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import collapseIcon from "../assets/collapse-icon.svg";
import lightModeIcon from "../assets/light-mode-icon.svg";
import darkModeIcon from "../assets/dark-mode-icon.svg";
import { ThemeContext } from "~/context/ThemeContext";

export default function Header({
  onCollapseClick,
}: {
  onCollapseClick: () => void;
}) {
  const user = useContext(UserContext)?.user;
  const fullName = user?.firstName + " " + user?.lastName;
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    setTheme(theme === "Light" ? "Dark" : "Light");
  }

  return (
    <header className=" relative flex gap-2 justify-between mt-0.5 border-b border-gray-500 p-1">
      <div className="flex justify-evenly shrink-0 gap-0.5 mb-0.5">
        <button
          id="btnCollapse"
          data-collapse="false"
          className="cursor-pointer"
          onClick={onCollapseClick}
        >
          <img
            src={collapseIcon}
            alt="Collapse icon"
            className="h-7 w-7 pr-1"
          />
        </button>
        <input
          type="search"
          placeholder="Search tasks..."
          className="border-[1.75px] border-border-color rounded-btn bg-primary-light p-1 focus:outline-primary w-full"
        />
      </div>
      <div className="flex items-center -gap-1">
        <button className=" cursor-pointer flex gap-1" onClick={toggleTheme}>
          <img
            className="w-5 h-5 top-1"
            src={theme === "Dark" ? lightModeIcon : darkModeIcon}
            alt={theme === "Dark" ? "Light mode icon" : "Dark mode icon"}
            loading="eager"
          />
          <span>|</span>
        </button>
        <div className="flex items-center -gap-1">
          <img
            src={user?.profilePictureURL}
            alt="User Avatar"
            className="object-cover rounded-full w-8 h-8"
          />
          <p className="text-center text-sm">{fullName ?? "Unknown"}</p>
        </div>
      </div>
    </header>
  );
}
