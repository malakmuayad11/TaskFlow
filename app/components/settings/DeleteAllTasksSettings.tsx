import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

export default function DeleteAllTasksSettings({
  onDeleteAllTasksClick,
}: {
  onDeleteAllTasksClick: () => void;
}) {
  const theme = useContext(ThemeContext).theme;
  return (
    <section className="mt-1">
      <h4 className="font-medium">Delete All Tasks</h4>
      <div className="flex justify-between">
        <p
          className={`${theme === "Light" ? "text-text-secondary" : "text-text-secondary-dark"}`}
        >
          This action cannot be undone
        </p>
        <button
          className="bg-red-100 text-red-500 border border-red-500 rounded-btn p-1 -translate-y-3 cursor-pointer hover:opacity-90"
          onClick={onDeleteAllTasksClick}
        >
          Delete All
        </button>
      </div>
    </section>
  );
}
