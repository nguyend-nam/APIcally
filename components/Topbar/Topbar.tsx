import {
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
import { ROUTES } from "../../constants/routes";

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
  const { pathname, push } = useRouter();
  const { logout } = useAuthContext();

  return (
    <div
      className={`p-8 py-4 gap-2 w-full flex justify-between items-start bg-white text-2xl font-medium text-slate-600 shadow-md ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start text-xl md:text-2xl">
        {extraLeft}
        {formatPathname(pathname)}
      </div>
      <div className="flex gap-4">
        <Dropdown
          overlay={
            <div className="flex flex-col shadow-lg overflow-hidden rounded-md">
              <Button
                label={
                  <div className="flex items-center gap-2 text-slate-600">
                    <UserOutlined className="!text-primary" />
                    Profile
                  </div>
                }
                className="!text-base !p-6 !py-3 !bg-white hover:!bg-gray-50 !text-gray-600 w-full text-left"
                borderRadius="none"
                onClick={() => push(ROUTES.PROFILE)}
              />
              <Button
                label={
                  <div className="flex items-center gap-2 text-slate-600">
                    <ExportOutlined className="!text-primary" rotate={180} />
                    Logout
                  </div>
                }
                className="!text-base !p-6 !py-3 !bg-white hover:!bg-gray-50 !text-gray-600 w-full text-left"
                borderRadius="none"
                onClick={logout}
              />
            </div>
          }
          placement="bottomRight"
          trigger={["click"]}
          className="cursor-pointer !hidden md:!block"
        >
          <Avatar icon={<UserOutlined size={64} />} />
        </Dropdown>
        <Button
          label={
            !isMenuOpen ? (
              <MenuUnfoldOutlined className="text-md absolute top-2 left-2" />
            ) : (
              <MenuFoldOutlined className="text-md absolute top-2 left-2" />
            )
          }
          className="w-[32px] h-[32px] relative block md:hidden"
          onClick={onClick}
        />
      </div>
    </div>
  );
};
