import { useState } from "react";
import type { Task } from "../../types/Task.ts";
import AddEditTaskForm from "./AddEditTaskForm";

type ControlBarProps = {
  onSearch: (title: string) => void;
  onFilterChange: (value: string) => void;
  onAdd: (addedTask: Omit<Task, "taskId">) => void;
};

export default function ControlBar({
  onSearch,
  onFilterChange,
  onAdd,
}: ControlBarProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [filter, setFilter] = useState("oldest");

  function handleSave(addedTask: Omit<Task, "taskId">) {
    onAdd(addedTask);
    setIsAddingTask(false);
  }

  function handleCancel() {
    setIsAddingTask(false);
  }

  return (
    <>
      {isAddingTask && (
        <AddEditTaskForm
          onCancel={handleCancel}
          isAddMode={true}
          onSave={handleSave}
        />
      )}
      {!isAddingTask && (
        <div>
          <input
            type="search"
            placeholder="Search tasks..."
            onChange={(e) => onSearch(e.target.value.trim())}
          />
          <label>Filters</label>
          <select
            value={filter}
            onChange={(e) => {
              onFilterChange(e.target.value);
              setFilter(e.target.value.toLowerCase());
            }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <button onClick={() => setIsAddingTask(true)}>+ Add Task</button>
        </div>
      )}
    </>
  );
}
