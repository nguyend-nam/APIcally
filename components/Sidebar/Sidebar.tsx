import {
  HomeFilled,
  CodeFilled,
  UserOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { Button } from "../Button";
import { Logo } from "../Logo";

export const Sidebar = ({ className }: { className?: string }) => {
  const { pathname, push } = useRouter();

  return (
    <div
      className={`flex flex-col bg-primary w-max h-screen items-center ${className}`}
    >
      <Logo size="sm" className="my-8" />
      <div className="h-full overflow-scroll w-full">
        <Button
          label={
            <>
              <HomeFilled className="h-fit mr-4" />{" "}
              <span className="!text-base">Home</span>
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
              <CodeFilled className="h-fit mr-4" />{" "}
              <span className="!text-base">API playground</span>
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
              <UserOutlined className="h-fit mr-4" />{" "}
              <span className="!text-base">User</span>
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
              <SettingFilled className="h-fit mr-4" />{" "}
              <span className="!text-base">Setting</span>
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
    </div>
  );
};
