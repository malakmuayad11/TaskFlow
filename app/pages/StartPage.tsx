import { useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
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
    <>
      <div
        className={`flex justify-center items-center min-h-screen w-screen ${
          theme === "Light" ? "bg-slate-50" : "bg-bg-main-dark"
        }`}
      >
        <div
          className={`flex gap-4 justify-center items-center flex-col border border-solid rounded-card p-12 ${
            theme === "Light"
              ? "bg-white border-border-color"
              : "bg-bg-surface-dark border-border-color-dark shadow-primary/30"
          } shadow-lg max-w-md md:w-full animate-slide-down`}
        >
          <div className="flex items-center">
            <img
              src={logo}
              alt="TaskFlow Logo"
              loading="eager"
              className="w-10 h-10"
            />
            <h1 className="text-5xl md:text-7xl font-semibold text-primary">
              TaskFlow
            </h1>
          </div>
          <p
            className={`${
              theme === "Light"
                ? "text-text-secondary"
                : "text-text-secondary-dark"
            }`}
          >
            Your Flow, Simplified.
          </p>
          <Button content="Sign Up" onClick={goToSignUp} />
          <div>
            <p
              className={`${
                theme === "Light"
                  ? "text-text-secondary"
                  : "text-text-secondary-dark"
              }`}
            >
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
