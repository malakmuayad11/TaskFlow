import type { Theme } from "~/types/Theme";
import type { Views } from "~/types/Views";

export function updateTheme(value: Theme) {
  localStorage.setItem("theme", value);
}

export function updateView(value: Views) {
  localStorage.setItem("view", value);
}

export function getValue(valueName: string) {
  return localStorage.getItem(valueName);
}
