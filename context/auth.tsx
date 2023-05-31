import dayjs from "dayjs";
import { createContext } from "@dwarvesf/react-utils";
import { notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { client } from "../libs/api";
import { WithChildren } from "../types/common";
import { removeCookie, setCookie } from "../utils";
import { UserInfoData } from "../libs/types";
import { useAsyncEffect } from "@dwarvesf/react-hooks";
// import { useAsyncEffect } from "@dwarvesf/react-hooks";
// import jwtDecode from "jwt-decode";
// import { diffTime, parseJWT } from "../utils";
// import { encodeData } from "../utils/crypto";

export interface UserInfo extends UserInfoData {
  balance: number;
}

const [Provider, useAuthContext] = createContext<{
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  user?: UserInfo;
  mutateData: () => Promise<void>;
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

  useAsyncEffect(async () => {
    const newAccessToken = window.localStorage.getItem(APICALLY_KEY);
    if (newAccessToken) {
      setAuthToken(newAccessToken);
      await client.setAuthToken(newAccessToken);

      try {
        const userInfoRes = await client.getUserProfile();
        const balanceRes = await client.getUserBalance();

        if (userInfoRes?.data && balanceRes?.data !== undefined) {
          setUser({ ...userInfoRes.data, balance: balanceRes?.data || 0 });
        } else {
          notification.error({ message: "Failed to authenticate" });
        }
      } catch (error) {
        notification.error({ message: error as any });
        console.error(error);
      }
    }
  }, []);

  const [user, setUser] = useState<UserInfo>();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => setIsAuthenticated(Boolean(authToken)), [authToken]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await client.login(username, password);

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

        try {
          const userInfoRes = await client.getUserProfile();
          const balanceRes = await client.getUserBalance();

          console.log(userInfoRes, balanceRes);

          if (userInfoRes?.data && balanceRes?.data !== undefined) {
            setUser({ ...userInfoRes.data, balance: balanceRes?.data || 0 });
          } else {
            notification.error({ message: "Could not login" });
          }
        } catch (error) {
          notification.error({ message: error as any });
          console.error(error);
        }
      }
    } catch (error) {
      notification.error({ message: error as any });
      console.error(error);
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(undefined);
    setAuthToken(undefined);
    window.localStorage.removeItem(APICALLY_KEY);
    removeCookie(APICALLY_REFRESH_KEY, {
      domain: window.location.hostname,
    });
    removeCookie(APICALLY_REFRESH_EXPIRY_KEY, {
      domain: window.location.hostname,
    });
    client.clearAuthToken();
  }, []);

  const mutateData = async () => {
    try {
      const userInfoRes = await client.getUserProfile();
      const balanceRes = await client.getUserBalance();

      if (userInfoRes?.data && balanceRes?.data !== undefined) {
        setUser({ ...userInfoRes.data, balance: balanceRes?.data || 0 });
      }
    } catch (error) {
      notification.error({ message: error as any });
      console.error(error);
    }
  };

  return (
    <Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        mutateData,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, useAuthContext };
