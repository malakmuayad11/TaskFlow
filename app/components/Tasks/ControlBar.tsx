import { useContext, useState } from "react";
import type { Task } from "../../types/Task.ts";
import { ThemeContext } from "~/context/ThemeContext.js";

type ControlBarProps = {
  onSearch: (title: string) => void;
  onFilterChange: (value: string) => void;
  onAdd: (addedTask: Omit<Task, "taskId">) => void;
  onStartAdd: () => void;
};

export default function ControlBar({
  onSearch,
  onFilterChange,
  onStartAdd,
}: ControlBarProps) {
  const theme = useContext(ThemeContext).theme;
  const [filter, setFilter] = useState("oldest");

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        className={`${
          theme === "Light"
            ? "bg-bg-surface text-text-secondary border-border-color"
            : "bg-bg-surface-dark text-text-secondary-dark border-border-color-dark"
        } w-full sm:w-auto sm:flex-1 border rounded-btn px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary`}
        type="search"
        placeholder="Search tasks..."
        onChange={(e) => onSearch(e.target.value.trim())}
      />

      <div className="flex gap-2 sm:ml-auto">
        <select
          className={`${
            theme === "Light"
              ? "bg-bg-surface text-text-primary border-border-color"
              : "bg-bg-surface-dark text-primary-light border-border-color-dark"
          } border rounded-btn px-3 py-2`}
          value={filter}
          onChange={(e) => {
            onFilterChange(e.target.value);
            setFilter(e.target.value.toLowerCase());
          }}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        <button
          className="bg-primary hover:bg-primary-hover text-primary-light rounded-btn px-4 py-2 hover:cursor-pointer active:scale-95 transition"
          onClick={onStartAdd}
        >
          + Add Task
        </button>
      </div>
    </div>
  );
}
