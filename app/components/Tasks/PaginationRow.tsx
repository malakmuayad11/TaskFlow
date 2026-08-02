import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

export default function PaginationRow({
  totalTasks,
  onclick,
}: {
  totalTasks: number;
  onclick: (pageNum: number) => void;
}) {
  const theme = useContext(ThemeContext).theme;
  const totalButtons = Math.ceil(totalTasks / 5);

  const buttons = Array.from({ length: totalButtons }, (_, index) => (
    <button
      className="bg-primary text-primary-light w-6 h-6 md:w-7 md:h-7 rounded-btn cursor-pointer hover:opacity-85"
      onClick={() => onclick(index + 1)}
      key={index}
    >
      {index + 1}
    </button>
  ));

  const showingTasksNum = totalTasks < 5 ? totalTasks : 5;

  return (
    <section
      className={`${theme === "Light" ? "bg-bg-surface border-border-color" : "bg-bg-surface-dark border-border-color-dark"} flex justify-between items-center border p-2`}
    >
      <p className="text-xs">
        Showing 1 to {showingTasksNum} of {totalTasks} tasks
      </p>
      <div className="flex gap-1">{buttons}</div>
    </section>
  );
}
