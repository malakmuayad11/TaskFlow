import { useContext, useState } from "react";
import { ViewContext } from "../../context/ViewContext";
import type { Views } from "~/types/Views";
import { updateView } from "~/services/localStorageService";
import { useToast } from "~/hooks/useToast";

export default function DefaultViewSettings() {
  const setView = useContext(ViewContext).setView;
  const [showToast, setShowToast] = useState(false);

  useToast(showToast, setShowToast);

  function handleBtnClick(value: Views) {
    setView(value);
    updateView(value);
    setShowToast(true);
  }

  return (
    <section className="mt-2">
      <h4 className="font-medium">Default View</h4>
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <p className="font-sm text-text-secondary">
          Choose your default tasks view
        </p>
        <div className="flex gap-1 mt-1 md:w-40">
          <button
            className="flex-1 bg-primary text-primary-light rounded-btn p-1 -translate-y-3 cursor-pointer hover:opacity-90"
            onClick={() => handleBtnClick("List")}
          >
            List
          </button>
          <button
            className="flex-1 bg-primary text-primary-light rounded-btn p-1 -translate-y-3 cursor-pointer hover:opacity-90"
            onClick={() => handleBtnClick("Board")}
          >
            Board
          </button>
        </div>
      </div>
      {showToast && (
        <div className="fixed right-4.5 bottom-4.5 bg-[rgba(0, 0, 0, 0.55)] border border-black backdrop-blur-[10px] py-3 px-3.5 rounded-2xl max-w-90 leading-[1.35] text-primary">
          Theme is changed successfully.
        </div>
      )}
    </section>
  );
}
