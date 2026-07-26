import { createContext, type Dispatch, type SetStateAction } from "react";
import type { User } from "../types/User";

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);
