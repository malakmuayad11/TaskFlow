import { useState, type ReactNode } from "react";
import { ViewContext } from "./ViewContext";
import type { Views } from "../types/Views";
import { getValue } from "~/services/localStorageService";

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<Views>(
    (getValue("view") as Views) ?? "List",
  );

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
