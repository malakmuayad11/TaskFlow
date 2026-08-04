export type Variant =
  "High" | "Medium" | "Low" | "Todo" | "Progress" | "Completed";

const badgeClass = "inline-block text-sm border rounded-[10px] p-0.75 m-0.75 ";

const highPriorityClass =
  badgeClass + " border-red-600 bg-red-100 text-red-600 ";

const mediumPriorityClass =
  badgeClass + " border-amber-600 bg-amber-100 text-amber-600 ";

const lowPriorityClass = // It is used for low priority and completed status
  badgeClass + " border-green-600 bg-green-100 text-green-600 ";

const inProgress = badgeClass + " bg-blue-100 border-blue-600 text-blue-600 "; // translate-y-3

const completedClass = lowPriorityClass;

const toDoClass = badgeClass + " bg-gray-200 border-gray-600 text-gray-600 ";

type BadgeProps = {
  variant: Variant;
  content?: string;
  additionalStyle?: string;
};

export default function Badge({
  variant,
  content,
  additionalStyle,
}: BadgeProps) {
  const className = (() => {
    switch (variant) {
      case "High":
        return highPriorityClass;
      case "Medium":
        return mediumPriorityClass;
      case "Low":
        return lowPriorityClass;
      case "Todo":
        return toDoClass;
      case "Progress":
        return inProgress;
      case "Completed":
        return completedClass;
      default:
        return badgeClass;
    }
  })();

  return (
    <p className={additionalStyle ? className + additionalStyle : className}>
      {content ? content : variant}
    </p>
  );
}
