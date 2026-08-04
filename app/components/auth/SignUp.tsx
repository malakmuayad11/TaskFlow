import { useRef, useState, useContext } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

import { addUser } from "../../services/indexedDB/userService";
import { EMAIL_REGX, PASSWORD_REGX } from "~/services/validation";
import { useToast } from "~/hooks/useToast";

import Input from "../shared/Input";
import FileInput from "../shared/FileInput";
import Button from "../shared/Button";
import Toast from "../shared/Toast";

import { ThemeContext } from "~/context/ThemeContext";

import { fileToBase64 } from "~/services/base64";
import profilePicturePlaceholder from "../../assets/profilePicturePlaceholder.svg";

export default function SignUp() {
  const { theme } = useContext(ThemeContext);

  const firstName = useRef<HTMLInputElement | null>(null);
  const lastName = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const confirmPassword = useRef<HTMLInputElement | null>(null);
  const profilePictureURL = useRef<HTMLInputElement | null>(null);

  const [emailExists, setEmailExists] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formValidity, setFormValidity] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  useToast(showToast, setShowToast);

  async function signUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert("1: signup started");

    try {
      setIsSubmitting(true);

      alert("2: before validation");

      if (
        !firstName.current ||
        !lastName.current ||
        !email.current ||
        !password.current ||
        !confirmPassword.current
      ) {
        alert("3: refs missing");
        return;
      }

      alert("4: refs OK");

      const file = profilePictureURL.current?.files?.[0];

      alert("5: before image");

      const profilePicture = file
        ? await fileToBase64(file)
        : profilePicturePlaceholder;

      alert("6: image OK");

      await addUser({
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        profilePictureURL: profilePicture,
      });

      alert("7: user added");

      navigate("/");
    } catch (error) {
      alert(
        "ERROR: " + (error instanceof Error ? error.message : String(error)),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-full ${
        theme === "Light" ? "bg-slate-50" : "bg-bg-main-dark"
      } px-4`}
    >
      <form
        onSubmit={signUp}
        className={`grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-xl ${
          theme === "Light"
            ? "bg-bg-main border-border-color"
            : "bg-bg-surface-dark border-border-color-dark shadow-primary/30"
        } p-2 md:p-4 border rounded-btn shadow-xl`}
      >
        <h2
          className={`text-2xl col-span-1 md:col-span-2 md:text-4xl font-semibold ${
            theme === "Light" ? "text-primary-dark" : "text-primary-light"
          }`}
        >
          Create Your Account
        </h2>

        <Input
          inputType="text"
          labelName="First Name:"
          ref={firstName}
          onValidationChange={(valid) =>
            setFormValidity((prev) => ({
              ...prev,
              firstName: valid,
            }))
          }
        />

        <Input
          inputType="text"
          labelName="Last Name:"
          ref={lastName}
          onValidationChange={(valid) =>
            setFormValidity((prev) => ({
              ...prev,
              lastName: valid,
            }))
          }
        />

        <div className="col-span-1 md:col-span-2">
          <Input
            inputType="email"
            labelName="Email:"
            validationRegex={EMAIL_REGX}
            validationMsg="Enter a valid email"
            ref={email}
            onValidationChange={(valid) =>
              setFormValidity((prev) => ({
                ...prev,
                email: valid,
              }))
            }
          />

          {emailExists && (
            <p className="text-red-500 text-sm">
              This email is already registered.
            </p>
          )}
        </div>

        <Input
          inputType="password"
          labelName="Password:"
          ref={password}
          validationRegex={PASSWORD_REGX}
          validationMsg="Password must contain 8 characters, uppercase, lowercase, number and special character."
          onValidationChange={(valid) =>
            setFormValidity((prev) => ({
              ...prev,
              password: valid,
            }))
          }
        />

        <Input
          inputType="password"
          labelName="Confirm Password:"
          ref={confirmPassword}
          onValidate={() =>
            password.current?.value === confirmPassword.current?.value
          }
          validationMsg="Passwords must match"
          onValidationChange={(valid) =>
            setFormValidity((prev) => ({
              ...prev,
              confirmPassword: valid,
            }))
          }
        />

        <FileInput
          ref={profilePictureURL}
          required={false}
          labelName="Profile Picture:"
          wrapperClassName="col-span-1 md:col-span-2 mb-1 mt-1"
        />

        <Button
          content={isSubmitting ? "Creating..." : "Create account"}
          type="submit"
          className="col-span-1 md:col-span-2 z-50"
        />
      </form>

      {showToast && <Toast title="Account is created successfully." />}
    </div>
  );
}
