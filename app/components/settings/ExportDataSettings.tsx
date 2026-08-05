import { useContext } from "react";
import { exportTasksToPDF } from "../../services/pdfService";
import { UserContext } from "../../context/UserContext";
import { getTasksByUserId } from "../../services/indexedDB/taskService";
import { ThemeContext } from "~/context/ThemeContext";

export default function ExportDataSettings() {
  const theme = useContext(ThemeContext).theme;
  const userId = useContext(UserContext)?.user?.userId;

  async function handleExportClick() {
    const userTasks = await getTasksByUserId(userId!);
    exportTasksToPDF(userTasks);
  }

  return (
    <section
      className={`border-b pb-3 ${
        theme === "Light"
          ? "border-b-border-color"
          : "border-b-border-color-dark"
      }`}
    >
      <h4 className="font-medium">Export Tasks</h4>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={`${
            theme === "Light"
              ? "text-text-secondary"
              : "text-text-secondary-dark"
          }`}
        >
          Download all your tasks data
        </p>

        <button
          className="w-full bg-primary text-primary-light rounded-btn py-2 px-3.5 cursor-pointer hover:opacity-90 sm:w-auto"
          onClick={handleExportClick}
        >
          Export
        </button>
      </div>
    </section>
  );
}
