import DefaultThemeSettings from "./DefaultThemeSettings";
import DefaultViewSettings from "./DefaultViewSettings";

export default function Preferences() {
  return (
    <section className="flex flex-col gap-1 border border-border-color rounded-btn p-2 bg-bg-surface">
      <h3 className="text-lg font-semibold">Preferences</h3>
      <div className="flex flex-col">
        <DefaultThemeSettings />
        <DefaultViewSettings />
      </div>
    </section>
  );
}
