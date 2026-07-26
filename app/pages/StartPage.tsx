import SignUp from "../components/auth/SignUp";
import Login from "../components/auth/Login";
import { useState } from "react";

export default function StartPage() {
  const [page, setPage] = useState<string | null>(null);
  function goToSignIn() {
    setPage("sign-in");
  }
  function goToLogin() {
    setPage("log-in");
  }
  return (
    <>
      {page === "sign-in" ? <SignUp /> : page === "log-in" ? <Login /> : null}
      {!page && (
        <div>
          <h1>TaskFlow</h1>
          <button onClick={goToSignIn}>Sign in</button>
          <div>
            <p>
              Already have an account? <a onClick={goToLogin}>Login</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
