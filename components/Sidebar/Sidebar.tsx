import {
  HomeFilled,
  CodeFilled,
  UserOutlined,
  SettingFilled,
  ToTopOutlined,
} from "@ant-design/icons";
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
      <div
        className="h-32 w-full flex justify-center items-center"
        style={{
          backgroundImage: "url(img/login-modal-bg.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          backgroundSize: "cover",
        }}
      >
        <Logo size={isExpanded ? "sm" : "xs"} />
      </div>
      <div className="h-full overflow-scroll w-full">
        <Button
          label={
            <>
              <HomeFilled className="h-fit" />{" "}
              {isExpanded && <span className="!text-base ml-4">Home</span>}
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
              <CodeFilled className="h-fit" />{" "}
              {isExpanded && (
                <span className="!text-base ml-4">API playground</span>
              )}
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
              <UserOutlined className="h-fit" />{" "}
              {isExpanded && <span className="!text-base ml-4">User</span>}
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
              <SettingFilled className="h-fit" />{" "}
              {isExpanded && <span className="!text-base ml-4">Setting</span>}
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
          />
        }
        className={`p-4 ${isExpanded ? "self-end" : "self-center"}`}
        onClick={() => setSidebarStatus(!isExpanded)}
      />
    </div>
  );
};
