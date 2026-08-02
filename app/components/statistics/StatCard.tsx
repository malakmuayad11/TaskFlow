import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

type StatCardProps = {
  title: string;
  statNumber: number;
  imageURL: string;
};

export default function StatCard({
  title,
  statNumber,
  imageURL,
}: StatCardProps) {
  const theme = useContext(ThemeContext).theme;

  return (
    <section
      className={`flex flex-col gap-1 ${theme === "Light" ? "bg-bg-surface border-border-color" : "bg-bg-surface-dark border-border-color-dark"} border rounded-btn p-2 justify-center items-center
      hover:shadow-xl duration-200`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex flex-row gap-0.5">
        <p className="text-xl font-semibold ">{statNumber}</p>
        <img className="w-8 h-8" src={imageURL} alt="Statisics image" />
      </div>
    </section>
  );
}
