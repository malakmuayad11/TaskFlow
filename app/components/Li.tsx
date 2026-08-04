import { useContext } from "react";
import { NavLink } from "react-router";
import { ThemeContext } from "~/context/ThemeContext";
type LiProps = {
  to: string;
  content: string;
  activeImgSrc: string;
  inActiveImgSrc: string;
};

export default function Li({
  to,
  content,
  activeImgSrc,
  inActiveImgSrc,
}: LiProps) {
  const theme = useContext(ThemeContext).theme;

  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive
            ? `flex items-center gap-2 ${
                theme === "Light"
                  ? "text-primary-light"
                  : "text-text-primary-dark"
              } font-medium p-4 bg-primary rounded-md hover:cursor-pointer md:pl-3`
            : `flex items-center gap-2 ${
                theme === "Light"
                  ? "text-text-primary"
                  : "text-text-primary-dark"
              } font-medium p-4 rounded-md hover:cursor-pointer md:pl-3 hover:bg-primary/45 hover:text-primary-light`
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={isActive ? activeImgSrc : inActiveImgSrc}
              alt={`${content} icon`}
              className="w-5 h-5"
              loading="eager"
            />
            {content}
          </>
        )}
      </NavLink>
    </li>
  );
}
