import DeleteAllTasksSettings from "./DeleteAllTasksSettings";
import ExportDataSettings from "./ExportDataSettings";
import ConfirmationDialog from "./ConfirmationDialog";
import { useContext } from "react";
import { UserContext } from "~/context/UserContext";
import { useState } from "react";
import { useToast } from "~/hooks/useToast";
import { deleteAllUserTasks } from "~/services/indexedDB/taskService";
import { ThemeContext } from "~/context/ThemeContext";
import Toast from "../Toast";

export default function DataManagement() {
  const theme = useContext(ThemeContext).theme;
  const userId = useContext(UserContext)?.user?.userId;
  const [isError, setIsError] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useToast(showToast, setShowToast);

  async function handleYesClick() {
    if (!userId) return;
    setIsError(false);
    try {
      await deleteAllUserTasks(userId);
      setShowToast(true);
    } catch {
      setIsError(true);
    } finally {
      setOpenConfirmation(false);
    }
  }

  function handleNoClick() {
    setOpenConfirmation(false);
  }

  function handleDeleteAllTasksClick() {
    if (!userId) return;
    setOpenConfirmation(true);
  }

  return (
    <>
      {openConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete all your tasks?"
          description="This action cannot be undone."
          onYesClick={handleYesClick}
          onNoClick={handleNoClick}
        />
      )}
      {!openConfirmation && (
        <>
          <div className={isError ? "block text-red-600" : "hidden"}>
            An error occurred while deleting tasks. Please try again.
          </div>
          <section
            className={`flex flex-col gap-1 border ${theme === "Light" ? "border-border-color bg-bg-surface" : "border-border-color-dark bg-bg-surface-dark"} rounded-btn p-2`}
          >
            <h3 className="text-lg font-semibold">Data Management</h3>

            <ExportDataSettings />
            <DeleteAllTasksSettings
              onDeleteAllTasksClick={handleDeleteAllTasksClick}
            />
          </section>
          {showToast && <Toast title="Tasks are deleted successfully." />}
        </>
      )}
    </>
  );
}
