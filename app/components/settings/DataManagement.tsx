import DeleteAllTasksSettings from "./DeleteAllTasksSettings";
import ExportDataSettings from "./ExportDataSettings";
import ConfirmationDialog from "./ConfirmationDialog";
import { useContext } from "react";
import { UserContext } from "~/context/UserContext";
import { useState } from "react";
import { useToast } from "~/hooks/useToast";
import { deleteAllUserTasks } from "~/services/indexedDB/taskService";

export default function DataManagement() {
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
          <section className="flex flex-col gap-1 border border-border-color rounded-btn p-2 bg-bg-surface">
            <h3 className="text-lg font-semibold">Data Management</h3>

            <ExportDataSettings />
            <DeleteAllTasksSettings
              onDeleteAllTasksClick={handleDeleteAllTasksClick}
            />
          </section>
          {showToast && (
            <div className="fixed right-4.5 bottom-4.5 bg-[rgba(0, 0, 0, 0.55)] border border-black backdrop-blur-[10px] py-3 px-3.5 rounded-2xl max-w-90 leading-[1.35] text-red-500">
              Tasks are deleted successfully.
            </div>
          )}
        </>
      )}
    </>
  );
}
