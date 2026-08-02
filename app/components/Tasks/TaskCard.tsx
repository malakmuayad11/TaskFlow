import type { TaskPriority } from "../../types/Task";
import calendarIcon from "../../assets/calendar-icon.svg";
import Badge from "../Badge";
import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

type TaskCardProps = {
  title: string;
  dueDate: Date;
  priority: TaskPriority;
};

export default function TaskCard({ title, dueDate, priority }: TaskCardProps) {
  const theme = useContext(ThemeContext).theme;
  const parsedDueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
  const formattedDate = Number.isNaN(parsedDueDate.getTime())
    ? "Invalid date"
    : parsedDueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });

  return (
    <section
      className={`flex flex-col gap-2 ${
        theme === "Light"
          ? "bg-bg-surface border-border-color"
          : "bg-bg-surface-dark border-border-color-dark hover:shadow-primary/30"
      } p-2 border rounded-btn hover:shadow-lg duration-200 mb-2`}
    >
      <h3 className="text-m font-bold">{title}</h3>
      <div className="flex gap-0.5">
        <img
          className="w-4 h-4 translate-y-1.5"
          src={calendarIcon}
          alt="Calendar icon"
        />
        <p
          className={`text-sm ${theme === "Light" ? "text-text-secondary" : "text-text-secondary-dark"} translate-y-1.5`}
        >
          {formattedDate}
        </p>
        <Badge variant={priority} />
      </div>
    </section>
  );
}
