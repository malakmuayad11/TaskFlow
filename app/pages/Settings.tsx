import Preferences from "../components/settings/Preferences";
import DataManagement from "../components/settings/DataManagement";
import { useContext } from "react";
import { ThemeContext } from "~/context/ThemeContext";
import ProfileDataSettings from "~/components/settings/ProfileDataSettings";

export default function Settings() {
  const theme = useContext(ThemeContext).theme;
  return (
    <section
      className={`flex flex-col gap-2 border ${
        theme === "Light" ? "border-border-color" : "border-border-color-dark"
      }
       rounded-btn p-4`}
    >
      <h2 className="text-xl font-bold">Settings</h2>
      <Preferences />
      <DataManagement />
      <ProfileDataSettings />
    </section>
  );
}
