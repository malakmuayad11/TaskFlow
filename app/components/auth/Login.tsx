import type { FormEvent } from "react";
import { getUser } from "../../services/indexedDB/userService";
import { useState, useContext, useRef } from "react";
import { hashPassword } from "../../services/HasherService";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { createLoggedInUserCookie } from "~/services/cookiesService";
import Input from "../Input";
import { EMAIL_REGX } from "~/services/validation";
import Button from "../Button";
import { ThemeContext } from "~/context/ThemeContext";

export default function Login() {
  const theme = useContext(ThemeContext).theme;
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [correctCredentials, setCorrectCredentials] = useState<boolean>(true);
  const setUser = useContext(UserContext)?.setUser;
  const navigator = useNavigate();

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.current || !password.current) return;

    try {
      const user = await getUser(email.current.value);

      if (
        user &&
        user.password === (await hashPassword(password.current.value))
      ) {
        setCorrectCredentials(true);
        setUser?.(user);
        createLoggedInUserCookie(user.userId);
        // there is an error with the login failed message
        navigator("/dashboard");
      } else {
        setCorrectCredentials(false);
      }
    } catch {
      setCorrectCredentials(false);
    }
  }

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-full ${theme === "Light" ? "bg-slate-50" : "bg-bg-main-dark"} px-4`}
    >
      <form
        onSubmit={login}
        className={`grid grid-cols-1 gap-2 w-full max-w-xl ${theme === "Light" ? " bg-bg-surface border-border-color" : "bg-bg-surface-dark border-border-color-dark"} p-2 md:p-4 border rounded-btn shadow-xl`}
      >
        <h2
          className={`text-2xl col-span-1 md:text-4xl font-semibold ${theme === "Light" ? "text-primary-dark" : "text-primary-light"}`}
        >
          Login To Your Account
        </h2>
        <div
          className={
            correctCredentials === true
              ? "hidden"
              : "bg-red-300 border border-red-500 p-2 rounded-btn"
          }
        >
          <p>Email or Password is wrong.</p>
        </div>
        <Input
          inputType="email"
          validationRegex={EMAIL_REGX}
          validationMsg="Enter a valid email"
          labelName="Email:"
          ref={email}
          className={`${theme === "Light" ? "text-primary-dark" : "text-primary-light"}`}
        />
        <Input inputType="password" labelName="Password:" ref={password} />
        <Button content="Login" className="mt-1" />
      </form>
    </div>
  );
}
