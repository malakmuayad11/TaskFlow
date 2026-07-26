export default function PaginationRow({
  totalTasks,
  onclick,
}: {
  totalTasks: number;
  onclick: (pageNum: number) => void;
}) {
  const totalButtons = Math.ceil(totalTasks / 5);

  const buttons = Array.from({ length: totalButtons }, (_, index) => (
    <button onClick={() => onclick(index + 1)} key={index}>
      {index + 1}
    </button>
  ));

  return (
    <section>
      <p>Showing 1 to 5 of {totalTasks} tasks</p>
      <div>{buttons}</div>
    </section>
  );
}
