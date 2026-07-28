import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function StartPage() {
  const navigator = useNavigate();
  function goToSignUp() {
    navigator("sign-up");
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-screen bg-slate-50">
        <div className="flex gap-4 justify-center items-center flex-col border border-solid rounded-card p-12 border-border-color shadow-lg bg-white max-w-md md:w-full animate-slide-down">
          <div className="flex items-center">
            <img
              src="app\assets\logo.png"
              alt="TaskFlow Logo"
              loading="eager"
              className="w-10 h-10"
            />
            <h1 className="text-5xl md:text-7xl font-semibold text-primary">
              TaskFlow
            </h1>
          </div>
          <p className="text-text-secondary">Your Flow, Simplified.</p>
          <button
            className="bg-primary hover:bg-primary-hover text-primary-light rounded-btn py-3 px-6 hover:cursor-pointer w-full text-xl hover:-translate-y-1 transition-transform duration-300"
            onClick={goToSignUp}
          >
            Sign Up
          </button>
          <div>
            <p className="text-text-secondary">
              Already have an account?{" "}
              <Link
                to="login"
                className="tranform-transition duration-300 inline-block hover:-translate-y-0.75 underline text-primary hover:text-primary-hover"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
