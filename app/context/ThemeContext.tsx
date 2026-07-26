import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Theme } from "../types/Theme.ts";

type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "Light",
  setTheme: () => undefined,
});
