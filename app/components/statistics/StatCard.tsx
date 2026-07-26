type StatCardProps = {
  title: string;
  statNumber: number;
  description?: string;
  imageURL: string;
};

export default function StatCard({
  title,
  statNumber,
  description,
  imageURL,
}: StatCardProps) {
  return (
    <section className="">
      <h2>{title}</h2>
      <img src={imageURL} alt="Statisics image" />
      <p>{statNumber}</p>
      <p>{description}</p>
    </section>
  );
}
