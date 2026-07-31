export default function PaginationRow({
  totalTasks,
  onclick,
}: {
  totalTasks: number;
  onclick: (pageNum: number) => void;
}) {
  const totalButtons = Math.ceil(totalTasks / 5);

  const buttons = Array.from({ length: totalButtons }, (_, index) => (
    <button
      className="bg-primary text-primary-light w-6 h-6 md:w-7 md:h-7 rounded-btn"
      onClick={() => onclick(index + 1)}
      key={index}
    >
      {index + 1}
    </button>
  ));

  const showingTasksNum = totalTasks < 5 ? totalTasks : 5;

  return (
    <section className="bg-bg-surface flex justify-between items-center border border-border-color p-2">
      <p className="text-xs">
        Showing 1 to {showingTasksNum} of {totalTasks} tasks
      </p>
      <div className="div gap-1">{buttons}</div>
    </section>
  );
}
