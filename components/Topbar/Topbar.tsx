import {
  ExportOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { Button } from "../Button";
import { formatPathname } from "../../utils";
import { ReactNode } from "react";
import { Avatar, Dropdown } from "antd";
import { useAuthContext } from "../../context/auth";
import { ROUTES } from "../../constants/routes";
import cx from "classnames";

export const Topbar = ({
  className,
  onClick,
  title,
  extraLeft,
  isMenuOpen,
}: {
  className?: string;
  onClick?: () => void;
  title?: string;
  extraLeft?: ReactNode;
  isMenuOpen: boolean;
}) => {
  const { pathname, push } = useRouter();
  const { logout, isAuthenticated } = useAuthContext();

  return (
    <div
      className={cx(
        "p-8 py-4 w-full flex flex-col justify-between items-start bg-white font-medium text-2xl !text-black shadow-md",
        className
      )}
    >
      <div className="flex justify-between w-full gap-2 items-center">
        <div className="flex flex-col md:flex-row items-start text-lg md:text-xl">
          {title || formatPathname(pathname)}
        </div>
        <div className="flex gap-2 md:gap-4">
          <div className="hidden md:block">{extraLeft}</div>
          <Button
            label={<ShoppingCartOutlined className="text-xl" />}
            appearance="link"
            className="flex items-center"
            onClick={() => push(ROUTES.CART)}
          />
          <Dropdown
            overlay={
              isAuthenticated ? (
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
                        <ExportOutlined
                          className="!text-primary"
                          rotate={180}
                        />
                        Logout
                      </div>
                    }
                    className="!text-base !p-6 !py-3 !bg-white hover:!bg-gray-50 !text-gray-600 w-full text-left"
                    borderRadius="none"
                    onClick={logout}
                  />
                </div>
              ) : (
                <div className="flex flex-col shadow-lg overflow-hidden rounded-md">
                  <Button
                    label={
                      <div className="flex items-center gap-2 text-slate-600">
                        <UserOutlined className="!text-primary" />
                        Login
                      </div>
                    }
                    className="!text-base !p-6 !py-3 !bg-white hover:!bg-gray-50 !text-gray-600 w-full text-left"
                    borderRadius="none"
                    onClick={() => push(ROUTES.LOGIN)}
                  />
                </div>
              )
            }
            placement="bottomRight"
            trigger={["click"]}
            className="cursor-pointer !hidden md:!block"
          >
            <Avatar
              icon={<UserOutlined size={64} />}
              className="!bg-slate-300"
            />
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
      <div className="md:hidden block w-full">{extraLeft}</div>
    </div>
  );
};
