import PasswordSettings from "./PasswordSettings";
import ProfileSettings from "./ProfileSettings";

export default function ProfileDataSettings() {
  return (
    <section className="flex flex-col gap-2">
      <ProfileSettings />
      <PasswordSettings />
    </section>
  );
}
