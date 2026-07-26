import type { TaskPriority } from "../../types/Task";

type TaskCardProps = {
  title: string;
  dueDate: Date;
  priority: TaskPriority;
};

export default function TaskCard({ title, dueDate, priority }: TaskCardProps) {
  const parsedDueDate = dueDate instanceof Date ? dueDate : new Date(dueDate);
  const formattedDate = Number.isNaN(parsedDueDate.getTime())
    ? "Invalid date"
    : parsedDueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });

  return (
    <section>
      <h3>{title}</h3>
      <div>
        {/* <img>date icon</img> */}
        <p>{formattedDate}</p>
      </div>
      <p>{priority}</p>
    </section>
  );
}
