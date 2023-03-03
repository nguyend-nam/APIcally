import { createContext } from "@dwarvesf/react-utils";
import { useCallback, useMemo, useState } from "react";
// import { client } from "../libs/api";
import { WithChildren } from "../types/common";
import { encodeData } from "../utils/crypto";

const [Provider, useAuthContext] = createContext<any>();

export const APICALLY_KEY = "apically-token";
export const LOGIN_REDIRECTION_KEY = "apically-redirection-key";

const AuthProvider = ({ children }: WithChildren) => {
  const [authToken, setAuthToken] = useState(() => {
    const value =
      typeof window !== "undefined"
        ? window.localStorage.getItem(APICALLY_KEY)
        : undefined;
    return value;
  });

  const isAuthenticated = useMemo(() => Boolean(authToken), [authToken]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      // const { token } = await client.login(username, password);
      const token = encodeData({ username, password });

      if (token) {
        window.localStorage.setItem(APICALLY_KEY, token);
        setAuthToken(token);
        // client.setAuthToken(token);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken(undefined);
    window.localStorage.removeItem(APICALLY_KEY);
    // client.clearAuthToken();
  }, []);

  return (
    <Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, useAuthContext };
