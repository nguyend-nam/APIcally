import { createContext } from "@dwarvesf/react-utils";
import { useEffect, useState } from "react";
import { WithChildren } from "../types/common";

const [Provider, useAuthContext] = createContext<any>();

const APICALLY_KEY = "apically-token";
export const LOGIN_REDIRECTION_KEY = "apically-redirection-key";

const AuthProvider = ({ children }: WithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const value =
      typeof window !== "undefined"
        ? window.localStorage.getItem(APICALLY_KEY)
        : "";
    return value && value !== undefined ? JSON.parse(value) : false;
  });

  useEffect(() => {
    window.localStorage.setItem(APICALLY_KEY, String(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, useAuthContext };
