import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export default function TasksHeader() {
  const user = useContext(UserContext)?.user;

  return (
    <header>
      <h2>Tasks</h2>
      <div>
        <button className="text-black">mode</button>
        <img src={user?.profilePictureURL} alt="User's avatar" />
      </div>
    </header>
  );
}
