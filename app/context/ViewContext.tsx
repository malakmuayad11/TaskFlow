import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Views } from "../types/Views.ts";

type ViewContextType = {
  view: Views;
  setView: Dispatch<SetStateAction<Views>>;
};

export const ViewContext = createContext<ViewContextType>({
  view: "List",
  setView: () => undefined,
});
