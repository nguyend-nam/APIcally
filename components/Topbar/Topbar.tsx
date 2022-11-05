import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Button } from "../Button";

const formatPathname = (pathname: string) => {
  const newPathname = pathname.slice(1);
  newPathname.replace("-", " ");
  return newPathname[0].toUpperCase() + newPathname.slice(1);
};

export const Topbar = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const { pathname } = useRouter();
  return (
    <div
      className={`p-8 py-4 w-full flex justify-between bg-white text-2xl font-medium text-slate-600 shadow-md ${className}`}
    >
      {formatPathname(pathname)}
      <Button
        label={<MenuUnfoldOutlined className="text-lg absolute top-2 left-2" />}
        className="p-2 w-[34px] relative block md:hidden"
        onClick={onClick}
      />
    </div>
  );
};
