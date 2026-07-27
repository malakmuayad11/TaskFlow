import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/User";
import { UserContext } from "./UserContext";
import { getCookie } from "~/services/cookiesService";
import { getUserById } from "~/services/indexedDB/userService";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const cookieUserId = getCookie("userId");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!cookieUserId) return;

    const id = parseInt(cookieUserId);
    if (Number.isNaN(id)) return;

    async function setUserProvider() {
      try {
        const user = await getUserById(id);
        setUser(user);
      } catch {
        console.error("Error while fetching user from IndexedDB");
      }
    }
    setUserProvider();
  }, [cookieUserId]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
