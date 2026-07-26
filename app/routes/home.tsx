import StartPage from "~/pages/StartPage";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Taskflow" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <StartPage />;
}
