import type { TaskPriority } from "~/types/Task";

type PriorityItem = {
  priority: TaskPriority;
  tasksNumber: number;
};

export default function PriorityItem({ priority, tasksNumber }: PriorityItem) {
  const bgColor =
    priority === "High"
      ? "bg-red-600"
      : priority === "Medium"
        ? "bg-amber-600"
        : "bg-green-600";

  return (
    <div className=" flex gap-2 border-b border-b-border-color">
      <div className={`translate-y-1 rounded-full w-3 h-3 ${bgColor}`}></div>
      <div className="flex justify-between w-full">
        <p className="font-medium">{priority}</p>
        <p className="font-medium">{tasksNumber}</p>
      </div>
    </div>
  );
}
