import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
  route("login", "routes/login.tsx"),

  route("dashboard", "routes/dashboard.tsx", [
    index("routes/dashboard-home.tsx"),
    route("tasks", "routes/tasks.tsx"),
    route("tasks-completed", "routes/tasks-completed.tsx"),
    route("tasks-pending", "routes/tasks-pending.tsx"),
    route("tasks-high-priority", "routes/tasks-high-priority.tsx"),
    route("settings", "routes/settings.tsx"),
  ]),
] satisfies RouteConfig;
