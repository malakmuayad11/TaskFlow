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
    <div className="flex gap-1">
      <input
        className={`${theme === "Light" ? "bg-bg-surface text-text-secondary border-border-color" : "bg-bg-surface-dark text-text-secondary-dark border-border-color-dark"} md:p-0.5 border rounded-btn focus:outline-primary`}
        type="search"
        placeholder="Search tasks..."
        onChange={(e) => onSearch(e.target.value.trim())}
      />

      <select
        className={`${theme === "Light" ? "bg-bg-surface text-text-primary border-border-color" : "bg-bg-surface-dark text-primary-light border-border-color-dark"} md:p-0.5 border rounded-btn`}
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
        className={`ml-auto bg-primary hover:bg-primary-hover text-primary-light rounded-btn p-0.5 md:p-1 hover:cursor-pointer text-md hover:-translate-y-1 transition-transform duration-300`}
        onClick={onStartAdd}
      >
        + Add Task
      </button>
    </div>
  );
}
