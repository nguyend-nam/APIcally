import {
  ToTopOutlined,
  CloseOutlined,
  HomeOutlined,
  CodeOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { Popover, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, Dispatch, SetStateAction, useState } from "react";
import { ROUTES } from "../../constants/routes";
import { useSidebarStatusContext } from "../../context";
import { Button } from "../Button";
import { Logo } from "../Logo";
import cx from "classnames";
import { useAuthContext } from "../../context/auth";

export const Sidebar = ({
  className,
  style,
  setIsMenuOpen,
}: {
  className?: string;
  style?: CSSProperties;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { pathname, push } = useRouter();
  const { sidebarStatus: isExpanded, setSidebarStatus } =
    useSidebarStatusContext();
  const { isAuthenticated } = useAuthContext();

  const sidebarRoutes = [
    {
      icon: <HomeOutlined className="h-fit" />,
      label: "Home",
      route: "/home",
    },
    {
      icon: <AppstoreAddOutlined className="h-fit" />,
      label: "Explore",
      route: "/explore",
    },
    {
      icon: <CodeOutlined className="h-fit" />,
      label: "API workspace",
      route: "/api-workspace",
    },
    {
      icon: <UserOutlined className="h-fit" />,
      label: isAuthenticated ? "Profile" : "Login",
      route: "/profile",
    },
  ];

  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState<boolean>(false);

  const workspaceExtraTab = (
    <div className="flex flex-col">
      <Button
        borderRadius="none"
        label={
          <span className="mx-2 text-left" style={{ transition: "0.4s" }}>
            Create API
          </span>
        }
        className="!text-sm !p-4 !py-3 bg-primary hover:bg-blue-900 text-left"
        onClick={() => push(ROUTES.API_WORKSPACE_CREATE)}
      />
      <Button
        borderRadius="none"
        label={
          <span className="mx-2 text-left" style={{ transition: "0.4s" }}>
            Utilize subscribed APIs
          </span>
        }
        className="!text-sm !p-4 !py-3 bg-primary hover:bg-blue-900 text-left"
        onClick={() => push(ROUTES.PROFILE)}
      />
    </div>
  );

  return (
    <div
      className={cx(
        "flex flex-col bg-primary w-max h-screen items-center",
        className
      )}
      style={style}
    >
      <div className="h-32 w-full flex justify-center relative items-center">
        <Link href="/">
          <a onClick={() => setIsMenuOpen(false)}>
            <Logo
              size={isExpanded ? "sm" : "xs"}
              hasText={isExpanded}
              textTheme="light"
              className="inline-block"
            />
          </a>
        </Link>
        <Button
          label={
            <CloseOutlined
              className="text-lg"
              style={{ transition: "transform 0.3s" }}
            />
          }
          className="!p-1.5 !pt-0 !bg-info !text-white md:hidden absolute right-[17px] block !-mt-11"
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
      <div className="h-full overflow-y-auto overflow-x-hidden w-full">
        {sidebarRoutes.map((route) =>
          route.label !== "API workspace" ? (
            <Tooltip
              title={!isExpanded ? route.label : null}
              placement="right"
              key={route.route}
            >
              <Button
                label={
                  <>
                    {route.icon}
                    <span
                      className={cx(`ml-4 w-[110px] text-left`, {
                        "translate-x-60 overflow-hidden -ml-[110px] opacity-0":
                          !isExpanded,
                      })}
                      style={{ transition: "0.4s" }}
                    >
                      {route.label}
                    </span>
                  </>
                }
                className={cx(
                  `!text-base bg-blue-800 w-full !p-6 !py-5 flex items-center justify-start hover:bg-blue-900`,
                  {
                    "!bg-white !text-primary": pathname.includes(route.route),
                  }
                )}
                style={{ transition: "0.2s" }}
                borderRadius="none"
                onClick={() => {
                  if (pathname !== `${route.route}`) {
                    setIsMenuOpen(false);
                    push(route.route);
                  }
                }}
              />
            </Tooltip>
          ) : (
            <div key={route.route}>
              <div className="flex relative">
                <Tooltip
                  title={!isExpanded ? route.label : null}
                  placement="right"
                >
                  <Button
                    key={route.route}
                    label={
                      <>
                        {route.icon}
                        <span
                          className={`ml-4 w-[110px] text-left ${
                            !isExpanded &&
                            "translate-x-60 overflow-hidden -ml-[110px] opacity-0"
                          }`}
                          style={{ transition: "0.4s" }}
                        >
                          {route.label}
                        </span>
                      </>
                    }
                    className={`!text-base bg-blue-800 w-full !p-6 !py-5 flex items-center justify-start hover:bg-blue-900 ${
                      pathname.includes(route.route) &&
                      "!bg-white !text-primary"
                    }`}
                    style={{ transition: "0.2s" }}
                    borderRadius="none"
                    onClick={() => {
                      if (pathname !== `${route.route}`) {
                        setIsMenuOpen(false);
                        push(route.route);
                      }
                    }}
                  />
                </Tooltip>

                {isExpanded ? (
                  <Button
                    key="drop-down"
                    label={
                      isWorkspaceOpen ? (
                        <CaretUpOutlined />
                      ) : (
                        <CaretDownOutlined />
                      )
                    }
                    className={`!text-sm bg-blue-800 w-max !px-0.5 flex items-center justify-start hover:bg-blue-900 ${
                      pathname.includes(route.route) &&
                      "!bg-white !text-primary"
                    }`}
                    style={{ transition: "0.2s" }}
                    borderRadius="none"
                    onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
                  />
                ) : (
                  <Popover
                    content={workspaceExtraTab}
                    placement="right"
                    className="right-0 absolute h-full"
                  >
                    <Button
                      key="drop-down"
                      label={<CaretRightOutlined />}
                      className={`!text-sm bg-blue-800 w-max !px-0.5 flex items-center justify-start hover:bg-blue-900 ${
                        pathname.includes(route.route) &&
                        "!bg-white !text-primary"
                      }`}
                      style={{ transition: "0.2s" }}
                      borderRadius="none"
                      onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
                    />
                  </Popover>
                )}
              </div>
              {isWorkspaceOpen && isExpanded && workspaceExtraTab}
            </div>
          )
        )}
      </div>
      <Button
        label={
          <ToTopOutlined
            className={`text-2xl ${isExpanded ? "-rotate-90" : "rotate-90"}`}
            style={{ transition: "transform 0.3s" }}
          />
        }
        className="!p-4 w-full hidden md:block"
        onClick={() => {
          setSidebarStatus(!isExpanded);
          setIsWorkspaceOpen(false);
        }}
      />
    </div>
  );
};
