import { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types/Task";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

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
  const [title, setTitle] = useState(task?.title ?? "");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "Todo");
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority ?? "Low",
  );
  const [dueDate, setDueDate] = useState<Date>(task?.dueDate ?? new Date());
  const user = useContext(UserContext)?.user;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.userId) return;

    if (isAddMode) {
      onSave({
        userId: user?.userId ?? 0,
        title: title,
        priority: priority,
        status: status,
        dueDate: dueDate,
      });
    }

    // Edit mode
    if (!isAddMode && task) {
      onSave({
        ...task,
        title,
        priority,
        status,
        dueDate,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>{isAddMode ? "Add Task" : "Edit Task"}</h2>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Status</label>
          <select
            required
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
          >
            <option value="In Progress">In Progress</option>
            <option value="Todo">Todo</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Priority</label>
          <select
            required
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task["priority"])}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            required
            value={dueDate.toISOString().slice(0, 10)}
            onChange={(e) => setDueDate(new Date(e.target.value))}
          />
        </div>
        <div>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
}
