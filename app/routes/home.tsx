import StartPage from "~/pages/StartPage";
import type { Route } from "./+types/home";
import { getCookie } from "~/services/cookiesService";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskFlow" },
    { name: "description", content: "Manage your tasks effeciently!" },
  ];
}

export async function clientLoader() {
  const userId = getCookie("userId");

  if (userId) throw redirect("/dashboard");

  return null;
}

export default function Home() {
  return <StartPage />;
}
