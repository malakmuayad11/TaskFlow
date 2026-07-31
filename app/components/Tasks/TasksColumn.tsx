import TaskCard from "./TaskCard";
import type { Task, TaskStatus } from "../../types/Task";
import AddEditTaskForm from "./AddEditTaskForm";
import { useState } from "react";
import Badge from "../Badge";
import type { Variant } from "../Badge";

type TasksColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  onAdd: (task: Omit<Task, "taskId">) => void;
};

export default function TasksColumn({
  status,
  tasks,
  onAdd,
}: TasksColumnProps) {
  const tasksByStatus = tasks.filter((task) => task.status === status);
  const [isAddingTask, setIsAddingTask] = useState(false);

  function handleSave(addedTask: Omit<Task, "taskId">) {
    onAdd(addedTask);
    setIsAddingTask(false);
  }

  function handleCancel() {
    setIsAddingTask(false);
  }

  const style =
    "bg-linear-to-b via-white to-white border-t-2 rounded-2xl p-4 shadow-sm ";

  const completedStyle = style + "from-green-500/10 border-green-500";

  const inProgressStyle = style + "from-blue-500/10 border-blue-500";

  const todoStyle = style + "from-gray-500/10 border-gray-500";

  return (
    <section>
      {/* {isAddingTask && (
        <AddEditTaskForm
          onCancel={handleCancel}
          isAddMode={true}
          onSave={handleSave}
        />
      )} */}
      <div
        className={
          status === "Completed"
            ? completedStyle
            : status === "In Progress"
              ? inProgressStyle
              : todoStyle
        }
      >
        <div className="flex justify-between mb-2">
          <h3 className="text-lg font-bold">{status}</h3>
          <Badge
            variant={
              status === "In Progress" ? "Progress" : (status as Variant)
            }
            content={tasksByStatus.length.toString()}
            additionalStyle="w-6 h-6 text-center"
          />
        </div>
        {tasksByStatus.map((task) => (
          <TaskCard
            key={task.taskId}
            title={task.title}
            dueDate={task.dueDate}
            priority={task.priority}
          />
        ))}
        <button
          className="w-full font-bold text-primary bg-bg-surface border border-border-color rounded-btn mt-2 cursor-pointer hover:opacity-70 duration-200"
          onClick={() => setIsAddingTask(true)}
        >
          + Add Task
        </button>
      </div>
    </section>
  );
}
