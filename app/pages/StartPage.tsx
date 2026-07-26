import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function StartPage() {
  const navigator = useNavigate();
  function goToSignUp() {
    navigator("sign-up");
  }

  return (
    <>
      <div>
        <h1>TaskFlow</h1>
        <button onClick={goToSignUp}>Sign Up</button>
        <div>
          <p>
            Already have an account? <Link to="login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
