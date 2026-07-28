import { useRef, useState, useEffect } from "react";
import type { FormEvent } from "react";
import { addUser } from "../../services/indexedDB/userService";
import { useNavigate } from "react-router";
import Input from "../Input";
import FileInput from "../FileInput";
import Button from "../Button";
import { EMAIL_REGX, PASSWORD_REGX } from "~/services/validation";
import { useToast } from "~/hooks/useToast";

export default function SignUp() {
  const firstName = useRef<HTMLInputElement | null>(null);
  const lastName = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const confirmPassword = useRef<HTMLInputElement | null>(null);
  const profilePictureURL = useRef<HTMLInputElement | null>(null);
  const [emailExists, setEmailExists] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [formValidity, setFormValidity] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const navigator = useNavigate();

  useToast(showToast, setShowToast);

  async function signUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // ensure all refs are available before accessing their values
    if (
      !firstName.current ||
      !lastName.current ||
      !email.current ||
      !password.current ||
      !confirmPassword.current ||
      !profilePictureURL.current
    )
      return;

    if (!Object.values(formValidity).every((f) => f === true)) return;

    // provide default profile picture
    const file = profilePictureURL.current.files?.[0];
    const profilePicture = file
      ? URL.createObjectURL(file)
      : "app/assets/profilePicturePlaceholder.svg";

    try {
      await addUser({
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        profilePictureURL: profilePicture,
      });
      setEmailExists(false);
      setShowToast(true);
      setTimeout(() => {
        navigator("/"); // go to start page
      }, 2200);
    } catch {
      setEmailExists(true);
      email.current.className += "outline-2 outline-red-500";
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-slate-50 px-4">
      <form
        onSubmit={signUp}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-xl bg-bg-main p-2 md:p-4 border-border-color border rounded-btn shadow-xl"
      >
        <h2 className="text-2xl col-span-1 md:col-span-2 md:text-4xl font-semibold">
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
          <p
            className={`${emailExists ? "visible" : "hidden"} text-red-500 text-sm`}
          >
            This email is already registered. Login instead.
          </p>
        </div>

        <Input
          inputType="password"
          labelName="Password:"
          ref={password}
          validationRegex={PASSWORD_REGX}
          validationMsg="Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
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
          onValidate={() => {
            return password.current?.value === confirmPassword.current?.value;
          }}
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

        <Button content="Submit" className="col-span-1 md:col-span-2" />
      </form>
      {showToast && (
        <div className="fixed right-4.5 bottom-4.5 bg-[rgba(0, 0, 0, 0.55)] border border-black backdrop-blur-[10px] py-3 px-3.5 rounded-2xl max-w-90 leading-[1.35] text-primary">
          Account is created successfully.
        </div>
      )}
    </div>
  );
}
