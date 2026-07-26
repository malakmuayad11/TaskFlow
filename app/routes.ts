import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
  route("login", "routes/login.tsx"),

  layout("routes/dashboard.tsx", [
    route("tasks", "routes/tasks.tsx"),
    route("settings", "routes/settings.tsx"),
  ]),
] satisfies RouteConfig;
