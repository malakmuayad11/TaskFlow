import { useContext, useRef, useState } from "react";
import Input from "../shared/Input";
import { UserContext } from "~/context/UserContext";
import { PASSWORD_REGX } from "~/services/validation";
import Button from "../shared/Button";
import { updateUserPasswword as updateUserPassword } from "~/services/indexedDB/userService";
import { useToast } from "~/hooks/useToast";
import Toast from "../shared/Toast";
import { ThemeContext } from "~/context/ThemeContext";

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
        <Input
          inputType="password"
          labelName="New Password:"
          ref={passwordRef}
          validationRegex={PASSWORD_REGX}
          validationMsg="Password must be at least 8 characters and include an uppercase letter,
           a lowercase letter, a number, and a special character."
        />
        <Input
          inputType="password"
          labelName="Confirm New Password:"
          ref={confirmPasswordRef}
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
