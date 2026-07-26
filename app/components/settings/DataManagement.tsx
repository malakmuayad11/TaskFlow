import DeleteAllTasksSettings from "./DeleteAllTasksSettings";
import ExportDataSettings from "./ExportDataSettings";

export default function DataManagement() {
  return (
    <section>
      <h3>Data Management</h3>
      <DeleteAllTasksSettings />
      <ExportDataSettings />
    </section>
  );
}
