import { useState, type ReactNode } from "react";
import { ViewContext } from "./ViewContext";
import type { View } from "../types/View";
import { getValue } from "~/services/localStorageService";

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<View>((getValue("view") as View) ?? "List");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
