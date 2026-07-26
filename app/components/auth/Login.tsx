import type { FormEvent } from "react";
import { getUser } from "../../services/indexedDB/userService";
import { useState, useContext } from "react";
import "../../styles/index.css";
import { hashPassword } from "../../services/HasherService";
import Dashboard from "../../pages/Dashboard";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setUser = useContext(UserContext)?.setUser;

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const user = await getUser(email);

      if (user && user.password === (await hashPassword(password))) {
        setIsLoggedIn(true);
        setUser?.(user);
        console.log("Logged in successfully");
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  }

  return (
    <>
      {isLoggedIn && <Dashboard />}

      {!isLoggedIn && (
        <form onSubmit={login}>
          <div
            className={
              !isLoggedIn
                ? "hidden"
                : "bg-red-300 border border-red-500 p-2 m-2"
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
      )}
    </>
  );
}
