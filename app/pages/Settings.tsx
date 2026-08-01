import Preferences from "../components/settings/Preferences";
import DataManagement from "../components/settings/DataManagement";

export default function Settings() {
  return (
    <section className="flex flex-col gap-2 border border-border-color rounded-btn p-4">
      <h2 className="text-xl font-bold">Settings</h2>
      <Preferences />
      <DataManagement />
    </section>
  );
}
