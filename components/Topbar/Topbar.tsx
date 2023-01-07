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
import { useAuthContext } from "../../context/auth";

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
  const { setIsAuthenticated } = useAuthContext();

  return (
    <div
      className={`p-8 py-4 w-full flex justify-between items-start bg-white text-2xl font-medium text-slate-600 shadow-md ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start">
        {formatPathname(pathname)}
        {extraLeft}
      </div>
      <div className="flex gap-4">
        <Dropdown
          overlay={
            <div className="flex flex-col shadow-lg overflow-hidden rounded-md">
              <Button
                label={
                  <div className="flex items-center gap-2 text-black">
                    <UserOutlined className="!text-primary" />
                    Profile
                  </div>
                }
                className="!text-base !p-3 !py-2 !bg-white hover:!bg-gray-100 !text-gray-600 w-full text-left"
                borderRadius="none"
              />
              <Button
                label={
                  <div className="flex items-center gap-2 text-black">
                    <ApiOutlined className="!text-primary" />
                    APIs
                  </div>
                }
                className="!text-base !p-3 !py-2 !bg-white hover:!bg-gray-100 !text-gray-600 w-full text-left"
                borderRadius="none"
              />
              <Button
                label={
                  <div className="flex items-center gap-2 text-black">
                    <ExportOutlined className="!text-primary" rotate={180} />
                    Logout
                  </div>
                }
                className="!text-base !p-3 !py-2 !bg-white hover:!bg-gray-100 !text-gray-600 w-full text-left"
                borderRadius="none"
                onClick={() => setIsAuthenticated(false)}
              />
            </div>
          }
          placement="bottomRight"
          trigger={["click"]}
          className="cursor-pointer !block"
        >
          <Avatar icon={<UserOutlined size={64} />} />
        </Dropdown>
        <Button
          label={
            !isMenuOpen ? (
              <MenuUnfoldOutlined className="text-lg absolute top-2 left-2" />
            ) : (
              <MenuFoldOutlined className="text-lg absolute top-2 left-2" />
            )
          }
          className="w-[34px] h-[34px] relative block md:hidden"
          onClick={onClick}
        />
      </div>
    </div>
  );
};
