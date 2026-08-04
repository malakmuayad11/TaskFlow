import { useContext, useState } from "react";
import { ViewContext } from "../../context/ViewContext";
import type { View } from "~/types/View";
import { updateView } from "~/services/localStorageService";
import { useToast } from "~/hooks/useToast";
import { ThemeContext } from "~/context/ThemeContext";
import Toast from "../shared/Toast";

export default function DefaultViewSettings() {
  const theme = useContext(ThemeContext).theme;
  const setView = useContext(ViewContext).setView;
  const [showToast, setShowToast] = useState(false);

  useToast(showToast, setShowToast);

  function handleBtnClick(value: View) {
    setView(value);
    updateView(value);
    setShowToast(true);
  }

  return (
    <section className="mt-2">
      <h4 className="font-medium">Default View</h4>
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <p
          className={`font-sm ${theme === "Light" ? "text-text-secondary" : "text-text-secondary-dark"}`}
        >
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
      {showToast && <Toast title=" View is changed successfully." />}
    </section>
  );
}
