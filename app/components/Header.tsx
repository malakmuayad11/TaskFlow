import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Header({
  onCollapseClick,
}: {
  onCollapseClick: () => void;
}) {
  const user = useContext(UserContext)?.user;
  const fullName = user?.firstName + " " + user?.lastName;

  return (
    <header className=" relative flex gap-2 justify-between mt-0.5 border-b border-gray-500 p-1">
      <div className="flex justify-evenly shrink-0 gap-0.5">
        <button
          id="btnCollapse"
          data-collapse="false"
          className="cursor-pointer"
          onClick={onCollapseClick}
        >
          <img
            src="src/assets/collapse.svg"
            alt="Collapse icon"
            className="h-5 w-5 pr-1"
          />
        </button>
        <input
          type="search"
          placeholder="Search anything..."
          className="bg-blue-800/30 p-1.5 rounded-md appearance-none outline-none border border-transparent focus:outline-none focus:ring-0"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="md:after:content-['_|'] md:after:text-gray-300 cursor-pointer">
          🔔
        </button>
        <div className="flex items-center gap-1 md:gap-2">
          <img
            src={user?.profilePictureURL ?? "src/assets/default-avatar.png"}
            alt={"User Avatar"}
            className="object-cover rounded-full w-8 h-8"
          />
          <span className="text-center">{fullName ?? "Unknown"}</span>
        </div>
      </div>
    </header>
  );
}
