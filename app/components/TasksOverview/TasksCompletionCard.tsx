import type { Task } from "../../types/Task";
import "../../styles/index.css";

export default function TasksCompletionCard({ tasks }: { tasks: Task[] }) {
  const completionPercentage: number =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((task) => task.status === "Completed").length /
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

  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (completionPercentage / 100) * circumference;

  return (
    <section>
      <h2>Tasks Completion</h2>
      <p>{completionPercentage}%</p>
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

        {/* Percentage */}
        <text
          x="40"
          y="45"
          textAnchor="middle"
          className="fill-black text-sm rotate-90"
        >
          {Math.round(completionPercentage)}%
        </text>
      </svg>
      <p>{feedback}</p>
    </section>
  );
}
