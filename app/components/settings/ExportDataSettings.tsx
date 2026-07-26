import { useContext } from "react";
import { exportTasksToPDF } from "../../services/pdfService";
import { UserContext } from "../../context/UserContext";
import { getTasksByUserId } from "../../services/indexedDB/taskService";

export default function ExportDataSettings() {
  const userId = useContext(UserContext)?.user?.userId;

  async function handleExportClick() {
    const userTasks = await getTasksByUserId(userId!);
    exportTasksToPDF(userTasks);
  }

  return (
    <section>
      <h4>Export Tasks</h4>
      <p>Download all your tasks data</p>
      <button onClick={handleExportClick}>Export</button>
    </section>
  );
}
