import { useRef } from "react";
import type { FormEvent } from "react";
import { addUser } from "../../services/indexedDB/userService";
import { useNavigate } from "react-router";
import RequiredComponent from "../requiredComponent";

export default function SignUp() {
  const firstName = useRef<HTMLInputElement | null>(null);
  const lastName = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const confirmPassword = useRef<HTMLInputElement | null>(null);
  const profilePictureURL = useRef<HTMLInputElement | null>(null);
  const navigator = useNavigate();

  async function signUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !firstName.current ||
      !lastName.current ||
      !email.current ||
      !password.current ||
      !confirmPassword.current ||
      !profilePictureURL.current
    ) {
      return; // Implement validation function
    }

    if (password.current.value !== confirmPassword.current.value) {
      return; // implement validation function
    }

    const file = profilePictureURL.current.files?.[0];
    const profilePicture = file
      ? URL.createObjectURL(file)
      : "app/assets/profilePicturePlaceholder.svg"; // provide a default picture

    try {
      await addUser({
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        profilePictureURL: profilePicture,
      });
      navigator("/");
    } catch {
      email.current.className = "outline-2 outline-red-500"; // error style
    }
  }

  return (
    <form
      onSubmit={signUp}
      className="grid grid-cols-2 gap-1 bg-bg-main p-2 justify-center align-center"
    >
      <h2 className="col-span-2">Create Your Account</h2>
      <div className="flex flex-col gap-0.5">
        <label>First Name:</label>
        <input
          className="border-[1.75px] border-border-color rounded-btn bg-primary-light p-1 focus:outline-primary"
          ref={firstName}
          type="text"
          required
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label>Last Name:</label>
        <input ref={lastName} type="text" required />
      </div>
      <div className="col-span-2">
        <label>Email:</label>
        <input ref={email} type="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input ref={password} type="password" required />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input ref={confirmPassword} type="password" required />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input ref={profilePictureURL} type="file" required accept="image/*" />
      </div>
      <button className="col-span-2">Submit</button>
    </form>
  );
}
