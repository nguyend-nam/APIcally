import dayjs from "dayjs";
import { createContext } from "@dwarvesf/react-utils";
import { notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { client } from "../libs/api";
import { WithChildren } from "../types/common";
import { removeCookie, setCookie } from "../utils";
// import { useAsyncEffect } from "@dwarvesf/react-hooks";
// import jwtDecode from "jwt-decode";
// import { diffTime, parseJWT } from "../utils";
// import { encodeData } from "../utils/crypto";

export interface UserInfo {
  username: string;
}
const [Provider, useAuthContext] = createContext<{
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  user?: UserInfo;
}>();

export const REFRESH_TOKEN_THRESHOLD_SECS = 9 * 60;

export const APICALLY_KEY = "apically-token";
export const APICALLY_REFRESH_KEY = "apically-refresh-token";
export const APICALLY_REFRESH_EXPIRY_KEY = "apically-refresh-expiry-token";
export const LOGIN_REDIRECTION_KEY = "apically-redirection-key";

const AuthProvider = ({ children }: WithChildren) => {
  const [authToken, setAuthToken] = useState(() => {
    const value =
      typeof window !== "undefined"
        ? window.localStorage.getItem(APICALLY_KEY)
        : undefined;
    return value;
  });

  useEffect(() => {
    const newAccessToken = window.localStorage.getItem(APICALLY_KEY);
    if (newAccessToken) {
      setAuthToken(newAccessToken);
      client.setAuthToken(newAccessToken);
    }
  }, []);

  // const [user, setUser] = useState<UserInfo>();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => setIsAuthenticated(Boolean(authToken)), [authToken]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await client.login(email, password);

      if (res?.accessToken) {
        window.localStorage.setItem(APICALLY_KEY, res.accessToken);
        setAuthToken(res.accessToken);
        client.setAuthToken(res.accessToken);

        const oneWeekTimestamp = dayjs().add(3, "day").unix();
        const expiryTime = dayjs.unix(oneWeekTimestamp);
        console.log(expiryTime);
        setCookie(APICALLY_REFRESH_KEY, res.refreshToken, {
          // expires: expiryTime.toDate(),
          domain: window.location.hostname,
        });
        setCookie(APICALLY_REFRESH_EXPIRY_KEY, expiryTime.toString(), {
          domain: window.location.hostname,
        });
      }
    } catch (error) {
      notification.error({ message: error as any });
      console.error(error);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken(undefined);
    window.localStorage.removeItem(APICALLY_KEY);
    removeCookie(APICALLY_REFRESH_KEY, {
      domain: window.location.hostname,
    });
    client.clearAuthToken();
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
