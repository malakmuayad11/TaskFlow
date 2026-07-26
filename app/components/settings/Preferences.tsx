import DefaultThemeSettings from "./DefaultThemeSettings";
import DefaultViewSettings from "./DefaultViewSettings";

export default function Preferences() {
  return (
    <section>
      <h3>Preferences</h3>
      <div>
        <DefaultThemeSettings />
        <DefaultViewSettings />
      </div>
    </section>
  );
}
