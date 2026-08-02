import { useContext } from "react";
import DefaultThemeSettings from "./DefaultThemeSettings";
import DefaultViewSettings from "./DefaultViewSettings";
import { ThemeContext } from "~/context/ThemeContext";

export default function Preferences() {
  const theme = useContext(ThemeContext).theme;
  return (
    <section
      className={`flex flex-col gap-1 border ${theme === "Light" ? "border-border-color bg-bg-surface" : "border-border-color-dark bg-bg-surface-dark"} rounded-btn p-2`}
    >
      <h3 className="text-lg font-semibold">Preferences</h3>
      <div className="flex flex-col">
        <DefaultThemeSettings />
        <DefaultViewSettings />
      </div>
    </section>
  );
}
