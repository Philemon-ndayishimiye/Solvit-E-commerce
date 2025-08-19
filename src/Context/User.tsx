import { createContext, useEffect, useState } from "react";
import type { LoginResponse } from "../type/Login";
import api from "../app/api/api";

interface UserType {
  children: React.ReactNode;
}

interface UserCont {
  user: LoginResponse | null;
}

export const UserContext = createContext<UserCont>({ user: null });

export const UserProvider = ({ children }: UserType) => {
  const [login, setLogin] = useState<LoginResponse | null>(null);

  useEffect(() => {
    const getLogin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await api.get<LoginResponse>(
          "https://dummyjson.com/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLogin(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getLogin();
  }, []);

  return (
    <UserContext.Provider value={{ user: login }}>
      {children}
    </UserContext.Provider>
  );
};
