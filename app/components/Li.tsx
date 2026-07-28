import { NavLink } from "react-router";
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
  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 text-primary-light font-medium p-4 bg-primary rounded-md hover:cursor-pointer md:pl-3"
            : "flex items-center gap-2 text-text-primary font-medium p-4 rounded-md hover:cursor-pointer md:pl-3 hover:bg-primary/45 hover:text-primary-light"
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
