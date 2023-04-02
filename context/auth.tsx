import { createContext } from "@dwarvesf/react-utils";
import { useCallback, useEffect, useMemo, useState } from "react";
// import { client } from "../libs/api";
import { WithChildren } from "../types/common";
// import jwtDecode from "jwt-decode";
import { encodeData } from "../utils/crypto";

interface UserInfo {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  name: string;
  sub: string;
  typ: string;
}
const [Provider, useAuthContext] = createContext<{
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  user?: UserInfo;
}>();

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

  // const [user, setUser] = useState<UserInfo>();

  const isAuthenticated = useMemo(() => Boolean(authToken), [authToken]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // const { access_token } = await client.login(email, password);
      const access_token = encodeData({ email, password });

      if (access_token) {
        window.localStorage.setItem(APICALLY_KEY, access_token);
        // setUser(jwtDecode(access_token));
        setAuthToken(access_token);
        // client.setAuthToken(access_token);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      // setUser(jwtDecode(authToken));
      setAuthToken(authToken);
      // client.setAuthToken(authToken);
    }
  }, [authToken]);

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
        // user,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, useAuthContext };
