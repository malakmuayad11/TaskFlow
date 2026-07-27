import type { FormEvent } from "react";
import { getUser } from "../../services/indexedDB/userService";
import { useState, useContext } from "react";
import { hashPassword } from "../../services/HasherService";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { createLoggedInUserCookie } from "~/services/cookiesService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setUser = useContext(UserContext)?.setUser;
  const navigator = useNavigate();

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const user = await getUser(email);

      if (user && user.password === (await hashPassword(password))) {
        setIsLoggedIn(true);
        setUser?.(user);
        createLoggedInUserCookie(user.userId);
        // there is an error with the login failed message
        navigator("/dashboard");
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  }

  return (
    <form onSubmit={login}>
      <div
        className={
          !isLoggedIn ? "hidden" : "bg-red-300 border border-red-500 p-2 m-2"
        }
      >
        <p>Email or Password is wrong, please try again.</p>
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
