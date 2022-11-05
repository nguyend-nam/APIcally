import {
  HomeFilled,
  CodeFilled,
  UserOutlined,
  SettingFilled,
  ToTopOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSidebarStatusContext } from "../../context";
import { Button } from "../Button";
import { Logo } from "../Logo";

export const Sidebar = ({ className }: { className?: string }) => {
  const { pathname, push } = useRouter();
  const { sidebarStatus: isExpanded, setSidebarStatus } =
    useSidebarStatusContext();

  return (
    <div
      className={`flex flex-col bg-primary w-max h-screen items-center ${className}`}
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
        <Button
          label={
            <>
              <HomeFilled className="h-fit" />
              <span
                className={`!text-base ml-4 w-[110px] text-left ${
                  !isExpanded &&
                  "translate-x-60 overflow-hidden -ml-[110px] opacity-0"
                }`}
                style={{ transition: "0.4s" }}
              >
                Home
              </span>
            </>
          }
          className={`bg-blue-800 w-full p-6 text-3xl flex items-center justify-start hover:bg-blue-900 ${
            pathname === "/home" && "!bg-white !text-primary"
          }`}
          borderRadius="none"
          onClick={() => {
            pathname === "/home" ? null : push("home");
          }}
        />
        <Button
          label={
            <>
              <CodeFilled className="h-fit" />
              <span
                className={`!text-base ml-4 w-[110px] text-left whitespace-nowrap ${
                  !isExpanded &&
                  "translate-x-60 overflow-hidden -ml-[110px] opacity-0"
                }`}
                style={{ transition: "0.4s" }}
              >
                API playground
              </span>
            </>
          }
          className={`bg-blue-800 w-full p-6 text-3xl flex items-center justify-start hover:bg-blue-900 ${
            pathname === "/api-playground" && "!bg-white !text-primary"
          }`}
          borderRadius="none"
          onClick={() => {
            pathname === "/api-playground" ? null : push("api-playground");
          }}
        />
        <Button
          label={
            <>
              <UserOutlined className="h-fit" />
              <span
                className={`!text-base ml-4 w-[110px] text-left ${
                  !isExpanded &&
                  "translate-x-60 overflow-hidden -ml-[110px] opacity-0"
                }`}
                style={{ transition: "0.4s" }}
              >
                User
              </span>
            </>
          }
          className={`bg-blue-800 w-full p-6 text-3xl flex items-center justify-start hover:bg-blue-900 ${
            pathname === "/user" && "!bg-white !text-primary"
          }`}
          borderRadius="none"
          onClick={() => {
            pathname === "/user" ? null : push("user");
          }}
        />
        <Button
          label={
            <>
              <SettingFilled className="h-fit" />
              <span
                className={`!text-base ml-4 w-[110px] text-left ${
                  !isExpanded &&
                  "translate-x-60 overflow-hidden -ml-[110px] opacity-0"
                }`}
                style={{ transition: "0.4s" }}
              >
                Setting
              </span>
            </>
          }
          className={`bg-blue-800 w-full p-6 text-3xl flex items-center justify-start hover:bg-blue-900 ${
            pathname === "/setting" && "!bg-white !text-primary"
          }`}
          borderRadius="none"
          onClick={() => {
            pathname === "/setting" ? null : push("setting");
          }}
        />
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
