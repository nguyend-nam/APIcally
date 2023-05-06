import { ReactNode, useEffect, useState } from "react";
import { useSidebarStatusContext } from "../../context";
import { WithChildren } from "../../types/common";
import { Input } from "../../components/Input";
import { Sidebar } from "../Sidebar";
import { Topbar } from "../Topbar";
import { Text } from "../Text";
import { Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  APICALLY_KEY,
  APICALLY_REFRESH_EXPIRY_KEY,
  APICALLY_REFRESH_KEY,
  LOGIN_REDIRECTION_KEY,
  REFRESH_TOKEN_THRESHOLD_SECS,
  useAuthContext,
} from "../../context/auth";
import { useRouter } from "next/router";
import { ROUTES } from "../../constants/routes";
import { Button } from "../Button";
import { useIsSSR } from "../../hooks/useIsSSR";
import cx from "classnames";
import { getCookie } from "../../utils";
import { client } from "../../libs/api";

export const Layout = ({
  children,
  className,
  contentClassName,
  pageTitle,
  hasFooter = true,
  hasSearch = false,
}: WithChildren & {
  className?: string;
  contentClassName?: string;
  pageTitle?: string;
  hasFooter?: boolean;
  hasSearch?: ReactNode;
}) => {
  const isSSR = useIsSSR();
  const { sidebarStatus } = useSidebarStatusContext();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { push } = useRouter();
  const { logout } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     replace(ROUTES.LOGIN);
  //   }
  // }, [isAuthenticated, replace]);

  // useEffect(() => {
  //   const value =
  //     typeof window !== "undefined"
  //       ? window.localStorage.getItem(APICALLY_KEY)
  //       : undefined;

  //   if (!value) {
  //     logout();
  //   }
  // }, [logout]);

  useEffect(() => {
    if (!window.location.href.includes(ROUTES.LOGIN)) {
      window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href);
    }
  }, []);

  useEffect(() => {
    const refreshTokenExpiry = getCookie(APICALLY_REFRESH_EXPIRY_KEY);
    const currentTime = new Date();

    console.log(currentTime, new Date(refreshTokenExpiry));
    console.log("expired?:", currentTime > new Date(refreshTokenExpiry));

    if (currentTime > new Date(refreshTokenExpiry)) {
      logout();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const refreshToken = getCookie(APICALLY_REFRESH_KEY);

    if (!refreshToken) {
      return;
    }

    const timer = setInterval(async () => {
      const res = await client.refreshToken(refreshToken);
      if (res?.accessToken) {
        window.localStorage.setItem(APICALLY_KEY, res.accessToken);
        client.setAuthToken(res.accessToken);
      } else {
        logout();
      }
    }, REFRESH_TOKEN_THRESHOLD_SECS * 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, []);

  return !isSSR ? (
    <div className={cx("relative md:flex", className)}>
      <Sidebar
        className={`top-0 min-w-max w-screen md:w-max fixed md:sticky z-50 md:z-0 ${
          isMenuOpen ? "ml-0" : "-ml-[125%]"
        } md:ml-0`}
        style={{ transition: "0.4s" }}
        setIsMenuOpen={setIsMenuOpen}
      />
      <div
        className={`flex flex-col justify-start grow h-screen overflow-auto bg-slate-100 shadow-slate-700/50 z-10 ${
          !sidebarStatus ? "shadow-xl" : "shadow-xs"
        }`}
        style={{ transition: "box-shadow 0.4s ease-in-out" }}
      >
        <Topbar
          className="sticky top-0 z-40 !px-4 md:!px-8"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          title={pageTitle}
          extraLeft={
            hasSearch ? (
              <div className="mt-4 md:mt-0">
                <Form className="flex items-center">
                  <Input
                    borderRadius="bottomLeft"
                    type="text"
                    id="home-search-input"
                    placeholder="Search or jump to..."
                    className="!font-normal !placeholder:font-normal h-8"
                    fullWidth
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    borderRadius="right"
                    label={<SearchOutlined />}
                    className="h-8 flex justify-center items-center !p-2"
                    onClick={() => {
                      if (searchQuery) {
                        push(ROUTES.EXPLORE(searchQuery));
                      }
                    }}
                  />
                </Form>
              </div>
            ) : null
          }
          isMenuOpen={isMenuOpen}
        />
        <div
          className={cx(
            `p-4 md:p-8 pb-8 w-full max-w-[1000px] mx-auto`,
            contentClassName
          )}
        >
          <div className="fade-in">{children}</div>
          {hasFooter && (
            <div className="text-center md:text-base mt-8">
              <Text as="span" className="text-slate-600">
                &copy; 2022 APIcally team. All rights reserved.
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
