import { useContext, useRef, useState } from "react";
import { UserContext } from "~/context/UserContext";
import Button from "../shared/Button";
import { updateUserPasswword as updateUserPassword } from "~/services/indexedDB/userService";
import { useToast } from "~/hooks/useToast";
import Toast from "../shared/Toast";
import { ThemeContext } from "~/context/ThemeContext";
import PasswordInput from "../shared/PasswordInput";

export default function PasswordSettings() {
  const user = useContext(UserContext)?.user;
  const theme = useContext(ThemeContext).theme;
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useToast(showToast, setShowToast);

  async function handleSave() {
    if (!user || !passwordRef || !confirmPasswordRef) return;

    if (passwordRef.current?.value != confirmPasswordRef.current?.value) return;

    if (
      passwordRef.current?.value === "" ||
      confirmPasswordRef.current?.value === ""
    ) {
      setToastMessage("Please fill all required fields.");
      setShowToast(true);
      return;
    }

    try {
      await updateUserPassword(user.userId, passwordRef.current?.value ?? "");
      if (passwordRef.current) passwordRef.current.value = "";
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
      setToastMessage("Password is updated sucessfully");
      setShowToast(true);
    } catch {
      setToastMessage("An error occurred while updating the password.");
      setShowToast(true);
    }
  }

  return (
    <>
      <section
        className={`flex flex-col gap-2 w-full ${
          theme === "Light"
            ? "border-border-color bg-bg-surface"
            : "border-border-color-dark bg-bg-surface-dark"
        } rounded-btn p-2`}
      >
        <h3 className="text-lg font-semibold col-span-2">Change Password</h3>
        <PasswordInput passwordRef={passwordRef} />
        <PasswordInput
          labelName="Confirm New Password"
          passwordRef={confirmPasswordRef}
          onValidate={() => {
            return (
              passwordRef.current?.value === confirmPasswordRef.current?.value
            );
          }}
          validationMsg="Passwords must match"
        />
        <Button content="Save" onClick={handleSave} />
        {showToast && <Toast title={toastMessage} />}
      </section>
    </>
  );
}
