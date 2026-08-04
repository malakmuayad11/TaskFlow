import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import type { Theme } from "~/types/Theme";
import { updateTheme } from "~/services/localStorageService";
import { useToast } from "~/hooks/useToast";
import Toast from "../shared/Toast";

export default function DefaultThemeSettings() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [showToast, setShowToast] = useState(false);

  useToast(showToast, setShowToast);

  function handleBtnClick(theme: Theme) {
    setTheme(theme);
    updateTheme(theme);
    setShowToast(true);
  }

  return (
    <section
      className={`border-b ${theme === "Light" ? "border-b-border-color" : "border-b-border-color-dark"}`}
    >
      <h4 className="font-medium">Theme</h4>
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <p
          className={`font-sm ${theme === "Light" ? "text-text-secondary" : "text-text-secondary-dark"}`}
        >
          Choose your preferred theme
        </p>
        <div className="flex gap-1 md:w-40">
          <button
            className={`flex-1 bg-primary text-primary-light rounded-btn p-1 -translate-y-1.5 cursor-pointer hover:opacity-90`}
            onClick={() => handleBtnClick("Light")}
          >
            Light
          </button>
          <button
            className="flex-1 bg-primary text-primary-light rounded-btn p-1 -translate-y-1.5 cursor-pointer hover:opacity-90"
            onClick={() => handleBtnClick("Dark")}
          >
            Dark
          </button>
        </div>
        {showToast && <Toast title="Theme is changed successfully." />}
      </div>
    </section>
  );
}
