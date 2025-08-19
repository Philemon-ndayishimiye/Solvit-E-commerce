import { createContext, useEffect, useState } from "react";
import type { Login } from "../type/Login";
import api from "../app/api/api";

interface UserType {
  children: React.ReactNode;
}

interface UserCont {
  user: Login[];
}

export const UserContext = createContext<Login[]>([]);

export const UserProvider = ({ children }: UserType) => {
  const [login, setLogin] = useState<Login>();

  useEffect(() => {
    const getLogin = async () => {
      try {
        const Token = JSON.parse(localStorage.getItem("token") || "");
        const res = await api.get<Login>("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });

        setLogin(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getLogin();
  }, [login]);
};
