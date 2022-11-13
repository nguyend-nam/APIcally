import {
  ToTopOutlined,
  UnorderedListOutlined,
  HomeOutlined,
  CodeOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties } from "react";
import { useSidebarStatusContext } from "../../context";
import { Button } from "../Button";
import { Logo } from "../Logo";

const sidebarRoutes = [
  { icon: <HomeOutlined className="h-fit" />, label: "Home", route: "home" },
  {
    icon: <CodeOutlined className="h-fit" />,
    label: "API workspace",
    route: "api-workspace",
  },
  {
    icon: <DashboardOutlined className="h-fit" />,
    label: "Dashboard",
    route: "dashboard",
  },
  {
    icon: <UnorderedListOutlined className="h-fit" />,
    label: "Feed",
    route: "feed",
  },
  {
    icon: <UserOutlined className="h-fit" />,
    label: "User",
    route: "user",
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
        {sidebarRoutes.map((route) => (
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
              pathname === `/${route.route}` && "!bg-white !text-primary"
            }`}
            style={{ transition: "0.2s" }}
            borderRadius="none"
            onClick={() => {
              pathname === `/${route.route}` ? null : push(route.route);
            }}
          />
        ))}
      </div>
      <Button
        label={
          <ToTopOutlined
            className={`text-2xl ${isExpanded ? "-rotate-90" : "rotate-90"}`}
            style={{ transition: "transform 0.3s" }}
          />
        }
        className="p-4 w-full hidden md:block"
        onClick={() => setSidebarStatus(!isExpanded)}
      />
    </div>
  );
};
