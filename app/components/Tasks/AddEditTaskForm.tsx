import { useRef, useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types/Task";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { ThemeContext } from "~/context/ThemeContext";

type AddEditTaskFormProps = {
  task?: Task;
  isAddMode: boolean;
  onSave: (task: Omit<Task, "taskId">) => void;
  onCancel: () => void;
};

export default function AddEditTaskForm({
  task,
  isAddMode,
  onSave,
  onCancel,
}: AddEditTaskFormProps) {
  const theme = useContext(ThemeContext).theme;
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "Todo");
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority ?? "Low",
  );
  const dueDateRef = useRef<HTMLInputElement | null>(null);
  const user = useContext(UserContext)?.user;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.userId) return;

    if (titleRef.current?.value === "") return;

    const dueDateValue = dueDateRef.current?.value
      ? new Date(dueDateRef.current.value)
      : (task?.dueDate ?? new Date());

    if (isAddMode) {
      onSave({
        userId: user?.userId ?? 0,
        title: titleRef.current?.value ?? task?.title ?? "",
        priority,
        status,
        dueDate: dueDateValue,
      });
    }

    // Edit mode
    if (!isAddMode && task) {
      onSave({
        ...task,
        title: titleRef.current?.value ?? task?.title ?? "",
        priority,
        status,
        dueDate: dueDateValue,
      });
    }
  };

  return (
    <div className="mx-auto container">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-1${
          theme === "Light"
            ? "bg-bg-surface border-border-color"
            : "bg-bg-surface-dark border-border-color-dark"
        } p-2 border rounded-btn`}
      >
        <h2 className="text-xl font-bold">
          {isAddMode ? "Add New Task" : "Edit Task"}
        </h2>
        <Input
          inputType="text"
          labelName="Title"
          ref={titleRef}
          defaultValue={task?.title}
          placeholder="Enter task title"
        />
        <div className="flex flex-col gap-1">
          <label>
            Status<span className="text-red-500">*</span>
          </label>
          <select
            className={`border ${
              theme === "Light"
                ? "border-border-color bg-primary-light"
                : "border-border-color-dark bg-primary-dark"
            } rounded-btn p-2  focus:outline-primary`}
            required
            value={status}
            defaultValue={task?.status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
          >
            <option value="In Progress">In Progress</option>
            <option value="Todo">Todo</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>
            Priority<span className="text-red-500">*</span>
          </label>
          <select
            className={`border ${
              theme === "Light"
                ? "border-border-color bg-primary-light"
                : "border-border-color-dark bg-primary-dark"
            } rounded-btn p-2 focus:outline-primary`}
            required
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
            defaultValue={task?.priority}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <Input
          inputType="date"
          labelName="Due Date"
          ref={dueDateRef}
          defaultValue={task?.dueDate.toString() ?? Date.now().toString()}
        />
        <div className="flex gap-1 mt-2">
          <button
            className={`${
              theme === "Light"
                ? "bg-bg-main hover:bg-bg-surface/50 text-text-primary border-border-color"
                : "bg-bg-main-dark hover:bg-bg-surface-dark/0 text-text-primary-dark border-border-color-dark"
            } rounded-btn py-3 px-6 hover:cursor-pointer w-full text-xl hover:-translate-y-1 transition-transform duration-300 border`}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <Button content="Save" type="submit" />
        </div>
      </form>
    </div>
  );
}
