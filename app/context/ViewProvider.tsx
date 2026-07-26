import { useState, type ReactNode } from "react";
import { ViewContext } from "./ViewContext";
import type { Views } from "../types/Views";

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<Views>("List");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
