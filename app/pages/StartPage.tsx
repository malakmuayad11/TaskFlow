import { useContext } from "react";
import { useNavigate, Link } from "react-router";
import Button from "~/components/shared/Button";
import { ThemeContext } from "~/context/ThemeContext";
import logo from "../assets/logo.png";

export default function StartPage() {
  const theme = useContext(ThemeContext).theme;
  const navigator = useNavigate();

  function goToSignUp() {
    navigator("sign-up");
  }

  return (
    <div
      className={`flex min-h-screen w-screen items-center justify-center px-4 ${
        theme === "Light" ? "bg-slate-50" : "bg-bg-main-dark"
      }`}
    >
      <div
        className={`flex w-full max-w-md flex-col items-center gap-5 rounded-btn border p-6 sm:p-8 md:p-12 ${
          theme === "Light"
            ? "border-border-color bg-white"
            : "border-border-color-dark bg-bg-surface-dark shadow-primary/30"
        } shadow-lg animate-slide-down`}
      >
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="TaskFlow Logo"
            loading="eager"
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
          <h1 className="text-3xl font-semibold text-primary sm:text-5xl md:text-7xl">
            TaskFlow
          </h1>
        </div>

        <p
          className={`text-center text-sm sm:text-base ${
            theme === "Light"
              ? "text-text-secondary"
              : "text-text-secondary-dark"
          }`}
        >
          Your Flow, Simplified.
        </p>

        <div className="w-full">
          <Button content="Sign Up" onClick={goToSignUp} />
        </div>

        <p
          className={`text-center text-sm sm:text-base ${
            theme === "Light"
              ? "text-text-secondary"
              : "text-text-secondary-dark"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="login"
            className="inline-block text-primary underline transition-transform duration-300 hover:-translate-y-0.5 hover:text-primary-hover"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
