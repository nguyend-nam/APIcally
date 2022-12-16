import {
  ApiOutlined,
  ExportOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { Button } from "../Button";
import { formatPathname } from "../../utils";
import { ReactNode } from "react";
import { Avatar, Dropdown } from "antd";

export const Topbar = ({
  className,
  onClick,
  extraLeft,
  isMenuOpen,
}: {
  className?: string;
  onClick?: () => void;
  extraLeft?: ReactNode;
  isMenuOpen: boolean;
}) => {
  const { pathname } = useRouter();
  return (
    <div
      className={`p-8 py-4 w-full flex justify-between items-start bg-white text-2xl font-medium text-slate-600 shadow-md ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start">
        {formatPathname(pathname)}
        {extraLeft}
      </div>
      <Button
        label={
          !isMenuOpen ? (
            <MenuUnfoldOutlined className="text-lg absolute top-2 left-2" />
          ) : (
            <MenuFoldOutlined className="text-lg absolute top-2 left-2" />
          )
        }
        className="p-2 w-[34px] h-[34px] relative block md:hidden"
        onClick={onClick}
      />
      <Dropdown
        overlay={
          <div className="flex flex-col shadow-lg overflow-hidden rounded-lg">
            <Button
              label={
                <div className="flex items-center gap-2">
                  <UserOutlined />
                  Profile
                </div>
              }
              className="p-3 py-2 !bg-white !text-primary w-full text-left"
              borderRadius="none"
            />
            <Button
              label={
                <div className="flex items-center gap-2">
                  <ApiOutlined />
                  APIs
                </div>
              }
              className="p-3 py-2 !bg-white !text-primary w-full text-left"
              borderRadius="none"
            />
            <Button
              label={
                <div className="flex items-center gap-2">
                  <ExportOutlined rotate={180} />
                  Logout
                </div>
              }
              className="p-3 py-2 !bg-white !text-primary w-full text-left"
              borderRadius="none"
            />
          </div>
        }
        placement="bottomRight"
        trigger={["click"]}
        className="cursor-pointer !hidden md:!block"
      >
        <Avatar icon={<UserOutlined size={64} />} />
      </Dropdown>
    </div>
  );
};
