import {
  ToTopOutlined,
  HomeOutlined,
  CodeOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, useState } from "react";
import { useSidebarStatusContext } from "../../context";
import { Button } from "../Button";
import { Logo } from "../Logo";

const sidebarRoutes = [
  { icon: <HomeOutlined className="h-fit" />, label: "Home", route: "/home" },
  {
    icon: <CodeOutlined className="h-fit" />,
    label: "API workspace",
    route: "/api-workspace",
  },
  {
    icon: <AppstoreAddOutlined className="h-fit" />,
    label: "Explore",
    route: "/explore",
  },
  {
    icon: <UserOutlined className="h-fit" />,
    label: "Profile",
    route: "/profile",
  },
];

export const Sidebar = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const { pathname, push } = useRouter();
  const { sidebarStatus: isExpanded, setSidebarStatus } =
    useSidebarStatusContext();

  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState<boolean>(false);

  const workspaceExtraTab = (
    <div key="workspace-subtab" className="flex flex-col">
      <Button
        key="create-api"
        borderRadius="none"
        label={
          <span
            className="!text-base mx-2 text-left"
            style={{ transition: "0.4s" }}
          >
            Create API
          </span>
        }
        className="text-lg p-4 py-3 bg-primary hover:bg-blue-900 text-left"
        onClick={() => push("/api-workspace/code-editor")}
      />
      <Button
        key="utilize-api"
        borderRadius="none"
        label={
          <span
            className="!text-base mx-2 text-left"
            style={{ transition: "0.4s" }}
          >
            Utilize subscribed APIs
          </span>
        }
        className="text-lg p-4 py-3 bg-primary hover:bg-blue-900 text-left"
        onClick={() => push("/profile/apis")}
      />
    </div>
  );

  return (
    <div
      className={`flex flex-col bg-primary w-max h-screen items-center ${className}`}
      style={style}
    >
      <div className="h-32 w-full flex justify-center items-center">
        <Link href="/">
          <a>
            <Logo
              size={isExpanded ? "sm" : "xs"}
              hasText={isExpanded}
              textTheme="light"
              className="inline-block"
            />
          </a>
        </Link>
      </div>
      <div className="h-full overflow-y-auto overflow-x-hidden w-full">
        {sidebarRoutes.map((route) =>
          route.label !== "API workspace" ? (
            <Button
              key={route.route}
              label={
                <>
                  {route.icon}
                  <span
                    className={`!text-base ml-4 w-[110px] text-left ${
                      !isExpanded &&
                      "translate-x-60 overflow-hidden -ml-[110px] opacity-0"
                    }`}
                    style={{ transition: "0.4s" }}
                  >
                    {route.label}
                  </span>
                </>
              }
              className={`bg-blue-800 w-full p-6 text-2xl flex items-center justify-start hover:bg-blue-900 ${
                pathname.includes(route.route) && "!bg-white !text-primary"
              }`}
              style={{ transition: "0.2s" }}
              borderRadius="none"
              onClick={() => {
                pathname === `${route.route}` ? null : push(route.route);
              }}
            />
          ) : (
            <>
              <div key="workspace-group" className="flex relative">
                <Button
                  key={route.route}
                  label={
                    <>
                      {route.icon}
                      <span
                        className={`!text-base ml-4 w-[110px] text-left ${
                          !isExpanded &&
                          "translate-x-60 overflow-hidden -ml-[110px] opacity-0"
                        }`}
                        style={{ transition: "0.4s" }}
                      >
                        {route.label}
                      </span>
                    </>
                  }
                  className={`bg-blue-800 w-full p-6 text-2xl flex items-center justify-start hover:bg-blue-900 ${
                    pathname.includes(route.route) && "!bg-white !text-primary"
                  }`}
                  style={{ transition: "0.2s" }}
                  borderRadius="none"
                  onClick={() => {
                    pathname === `${route.route}` ? null : push(route.route);
                  }}
                />

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
                    className={`bg-blue-800 w-max px-0.5 text-sm flex items-center justify-start hover:bg-blue-900 ${
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
                      label={<CaretDownOutlined />}
                      className={`bg-blue-800 w-max px-0.5 text-sm flex items-center justify-start hover:bg-blue-900 ${
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
            </>
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
        className="p-4 w-full hidden md:block"
        onClick={() => {
          setSidebarStatus(!isExpanded);
          setIsWorkspaceOpen(false);
        }}
      />
    </div>
  );
};
