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
      className={`border-b ${
        theme === "Light"
          ? "border-b-border-color"
          : "border-b-border-color-dark"
      }`}
    >
      <h4 className="font-medium">Export Tasks</h4>

      <div className="flex justify-between">
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
          className="bg-primary text-primary-light rounded-btn py-1 px-3.5 -translate-y-1.5 cursor-pointer hover:opacity-90"
          onClick={handleExportClick}
        >
          Export
        </button>
      </div>
    </section>
  );
}
