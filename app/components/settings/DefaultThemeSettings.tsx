import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function DefaultThemeSettings() {
  const setTheme = useContext(ThemeContext).setTheme;

  return (
    <section>
      <h4>Theme</h4>
      <p>Choose your preferred theme</p>

      <div>
        <button onClick={() => setTheme("Light")}>Light</button>
        <button onClick={() => setTheme("Dark")}>Dark</button>
      </div>
    </section>
  );
}
