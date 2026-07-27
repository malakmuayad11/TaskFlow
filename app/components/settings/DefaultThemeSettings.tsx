import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import type { Theme } from "~/types/Theme";
import { updateTheme } from "~/services/localStorageService";

export default function DefaultThemeSettings() {
  const setTheme = useContext(ThemeContext).setTheme;

  function handleBtnClick(theme: Theme) {
    setTheme(theme);
    updateTheme(theme);
  }

  return (
    <section>
      <h4>Theme</h4>
      <p>Choose your preferred theme</p>

      <div>
        <button onClick={() => handleBtnClick("Light")}>Light</button>
        <button onClick={() => handleBtnClick("Dark")}>Dark</button>
      </div>
    </section>
  );
}
