import { useState } from "react";
import type { Task } from "../../types/Task.ts";
import AddEditTaskForm from "./AddEditTaskForm";

type ControlBarProps = {
  onSearch: (title: string) => void;
  onFilterChange: (value: string) => void;
  onAdd: (addedTask: Omit<Task, "taskId">) => void;
  onStartAdd: () => void;
  // IsAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ControlBar({
  onSearch,
  onFilterChange,
  onStartAdd,
}: ControlBarProps) {
  const [filter, setFilter] = useState("oldest");

  return (
    <div className="flex gap-1">
      <input
        className="bg-bg-surface md:p-0.5 text-text-secondary border border-border-color rounded-btn focus:outline-primary"
        type="search"
        placeholder="Search tasks..."
        onChange={(e) => onSearch(e.target.value.trim())}
      />

      <select
        className=" bg-bg-surface md:p-0.5 text-text-primary border border-border-color rounded-btn"
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
