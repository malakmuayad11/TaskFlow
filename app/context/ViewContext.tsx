import { createContext, type Dispatch, type SetStateAction } from "react";
import type { View } from "../types/View.js";

type ViewContextType = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
};

export const ViewContext = createContext<ViewContextType>({
  view: "List",
  setView: () => undefined,
});
