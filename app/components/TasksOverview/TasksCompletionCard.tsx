import type { Task } from "../../types/Task";

export default function TasksCompletionCard({ tasks }: { tasks: Task[] }) {
  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.reduce(
            (count, task) => count + (task.status === "Completed" ? 1 : 0),
            0,
          ) /
            tasks.length) *
            100,
        );

  const feedback: string =
    completionPercentage <= 25
      ? "No progress!"
      : completionPercentage <= 50
        ? "Getting there!"
        : completionPercentage <= 75
          ? "Almost done!"
          : "Completed!";

  // Constants for drawing the SVG chart
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completionPercentage / 100) * circumference;

  return (
    <section className="items-center bg-bg-surface border border-border-color rounded-btn flex flex-col gap-2 p-2 hover:shadow-lg duration-200">
      <h5 className="self-start text-m font-medium">Tasks Completion</h5>
      <div className="flex justify-center items-center gap-5">
        <div>
          <p className="text-2xl font-semibold">{completionPercentage}%</p>
        </div>
        <svg width="80" height="80" className="-rotate-90">
          {/* Background */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#9ca3af"
            strokeWidth="8"
            fill="none"
          />

          {/* Progress */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#22c55e"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="text-sm text-text-secondary">{feedback}</p>
    </section>
  );
}
