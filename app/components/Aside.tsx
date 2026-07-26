import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Aside({
  isCollapsed,
  onCollapseClick,
}: {
  isCollapsed: boolean;
  onCollapseClick: () => void;
}) {
  const setUser = useContext(UserContext)?.setUser;

  function logout() {
    setUser?.(null);
    // go to the start page
  }

  return (
    <>
      <aside
        id="sideMenu"
        className={`overflow-hidden border-r border-gray-500 fixed md:static top-0 left-0 h-full bg-slate-900 z-50 transform ${isCollapsed ? "-translate-x-full" : "translate-x-0"} transition-all duration-300 ease-in-out`}
      >
        <div className="mb-6">
          <h1 className="text-amber-50 p-4 flex gap-1 justify-start">
            <img
              src="src/assets/logo.svg"
              alt="Logo icon"
              className="w-5 h-5"
            />
            TaskFlow
          </h1>
        </div>
        <nav className="m-2">
          <ul className="flex flex-col gap-2">
            <li className="text-gray-300 py-4 bg-blue-800/30 rounded-md hover:cursor-pointer md:pl-3">
              <a href="#" className="flex items-center justify-start gap-0.5">
                <img
                  src="src/assets/dashboard.svg"
                  alt="Dashboard icon"
                  className="w-5 h-5"
                />
                Dashboard
              </a>
            </li>
            <li className="py-4 text-gray-300 md:p-4 hover:bg-blue-800/40 hover:rounded-md hover:cursor-pointer">
              <a className="flex justify-start gap-1">
                <img
                  src="src/assets/user.svg"
                  alt="User icon"
                  className="w-5 h-5"
                />
                Tasks
              </a>
            </li>
            <li className="py-4 text-gray-300 md:p-4 hover:bg-blue-800/40 hover:rounded-md hover:cursor-pointer">
              <a href="#" className="flex justify-start gap-1.5">
                <img
                  src="src/assets/order.svg"
                  alt="Order icon"
                  className="w-4.5 h-4.5"
                />
                Settings
              </a>
            </li>
          </ul>
          <button className="text-white" onClick={logout}>
            Log out
          </button>
        </nav>
      </aside>
      <div
        onClick={onCollapseClick}
        id="overlay"
        className={`fixed inset-0 bg-black/50 ${isCollapsed ? "hidden" : "md:hidden"}`}
      />
    </>
  );
}
