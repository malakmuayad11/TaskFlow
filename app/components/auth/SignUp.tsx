import { useRef } from "react";
import type { FormEvent } from "react";
import { addUser } from "../../services/indexedDB/userService";
import "../../styles/index.css";

export default function SignUp() {
  const firstName = useRef<HTMLInputElement | null>(null);
  const lastName = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const confirmPassword = useRef<HTMLInputElement | null>(null);
  const profilePictureURL = useRef<HTMLInputElement | null>(null);

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

    const file = profilePictureURL.current.files?.[0] ?? null; // provide a default picture
    const profilePicture = file ? URL.createObjectURL(file) : "";

    try {
      await addUser({
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        profilePictureURL: profilePicture,
      });
      // if added, go to the login page
    } catch {
      email.current.className = "outline-2 outline-red-500"; // error style
    }
  }

  return (
    <form onSubmit={signUp}>
      <div>
        <label>First Name:</label>
        <input ref={firstName} type="text" required />
      </div>
      <div>
        <label>Last Name:</label>
        <input ref={lastName} type="text" required />
      </div>
      <div>
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
      <button>Submit</button>
    </form>
  );
}
