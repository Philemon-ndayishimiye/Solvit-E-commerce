import { useContext } from "react";
import { UserContext } from "../Context/User";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser is throwing an error");
  } else {
    return context;
  }
};
