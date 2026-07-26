import { useContext, useState, useEffect } from "react";
import { deleteAllUserTasks } from "../../services/indexedDB/taskService";
import { UserContext } from "../../context/UserContext";
import ConfirmationDialog from "./ConfirmationDialog";

export default function DeleteAllTasksSettings() {
  const userId = useContext(UserContext)?.user?.userId;
  const [isError, setIsError] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [showToast]);

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
    <section>
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
          <h4>Delete All Tasks</h4>
          <p>This action cannot be done</p>
          <button onClick={handleDeleteAllTasksClick}>Delete All</button>
          {showToast && (
            <div className="fixed right-4.5 bottom-4.5 bg-[rgba(0, 0, 0, 0.55)] border border-black backdrop-blur-[10px] py-3 px-3.5 rounded-2xl max-w-90 leading-[1.35] text-red-500">
              Tasks are deleted successfully.
            </div>
          )}
        </>
      )}
    </section>
  );
}
