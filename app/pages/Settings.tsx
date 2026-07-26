import Preferences from "../components/settings/Preferences";
import DataManagement from "../components/settings/DataManagement";

export default function Settings() {
  return (
    <section>
      <h2>Settings</h2>
      <Preferences />
      <DataManagement />
    </section>
  );
}
