import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";

type ConfirmationDialogProps = {
  message: string;
  description?: string;
  onYesClick: () => void;
  onNoClick: () => void;
};

export default function ConfirmationDialog({
  message,
  description,
  onYesClick,
  onNoClick,
}: ConfirmationDialogProps) {
  const theme = useContext(ThemeContext).theme;

  return (
    <section>
      <h3 className="text-lg font-semibold">{message}</h3>
      {description && (
        <p
          className={`${theme === "Light" ? "text-text-secondary" : "text-text-secondary-dark"}`}
        >
          {description}
        </p>
      )}
      <div className="flex gap-1">
        <button
          className="flex-1 bg-red-100 text-red-500 border border-red-500 rounded-btn p-1 cursor-pointer hover:opacity-90"
          onClick={onYesClick}
        >
          Yes
        </button>
        <button
          className="flex-1 bg-primary text-primary-light rounded-btn p-1 cursor-pointer hover:opacity-90"
          onClick={onNoClick}
        >
          No
        </button>
      </div>
    </section>
  );
}
