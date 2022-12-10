import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Button } from "../Button";
import { formatPathname } from "../../utils";
import { ReactNode } from "react";

export const Topbar = ({
  className,
  onClick,
  extraLeft,
}: {
  className?: string;
  onClick?: () => void;
  extraLeft?: ReactNode;
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
        label={<MenuUnfoldOutlined className="text-lg absolute top-2 left-2" />}
        className="p-2 w-[34px] h-[34px] relative block md:hidden"
        onClick={onClick}
      />
    </div>
  );
};
