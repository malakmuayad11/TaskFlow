import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import collapseIconDark from "../assets/collapse-icon-dark.svg";
import collapseIconLight from "../assets/collapse-icon-light.svg";
import lightModeIcon from "../assets/light-mode-icon.svg";
import darkModeIcon from "../assets/dark-mode-icon.svg";
import { ThemeContext } from "~/context/ThemeContext";
import { updateTheme } from "~/services/localStorageService";

export default function Header({
  onCollapseClick,
}: {
  onCollapseClick: () => void;
}) {
  const user = useContext(UserContext)?.user;
  const fullName = user?.firstName + " " + user?.lastName;
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    const newTheme = theme === "Light" ? "Dark" : "Light";
    setTheme(newTheme);
    updateTheme(newTheme);
  }

  return (
    <header
      className={`${
        theme === "Light"
          ? "bg-bg-main border-gray-500"
          : "bg-bg-surface-dark border-border-color-dark"
      } sticky top-0 z-1000 flex gap-2 justify-between mt-0.5 border-b p-1`}
    >
      <div className="flex justify-evenly shrink-0 gap-0.5 mb-0.5">
        <button
          id="btnCollapse"
          data-collapse="false"
          className="cursor-pointer"
          onClick={onCollapseClick}
        >
          <img
            src={theme === "Light" ? collapseIconDark : collapseIconLight}
            alt="Collapse icon"
            className="h-7 w-7 pr-1"
          />
        </button>
      </div>
      <div className="flex items-center -gap-1">
        <button className=" cursor-pointer flex gap-1" onClick={toggleTheme}>
          <img
            className="w-5 h-5 top-1"
            src={theme === "Dark" ? lightModeIcon : darkModeIcon}
            alt={theme === "Dark" ? "Light mode icon" : "Dark mode icon"}
            loading="eager"
          />
          <span
            className={`${
              theme === "Light" ? "text-primary-dark" : "text-primary-light"
            }`}
          >
            |
          </span>
        </button>
        <div className="flex items-center -gap-1">
          <img
            src={user?.profilePictureURL}
            alt="User Avatar"
            className="object-cover rounded-full w-6 h-6"
          />
          <p
            className={`text-center text-sm ${
              theme === "Light" ? "text-text-primary" : "text-text-primary-dark"
            } m-1`}
          >
            {fullName ?? "Unknown"}
          </p>
        </div>
      </div>
    </header>
  );
}
