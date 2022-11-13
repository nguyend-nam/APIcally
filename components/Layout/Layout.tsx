import { useState } from "react";
import { useSidebarStatusContext } from "../../context";
import { WithChildren } from "../../types/common";
import { Sidebar } from "../Sidebar";
import { Topbar } from "../Topbar";
import { Text } from "../Text";

export const Layout = ({
  children,
  className,
  contentClassName,
  hasFooter = true,
}: WithChildren & {
  className?: string;
  contentClassName?: string;
  hasFooter?: boolean;
}) => {
  const { sidebarStatus } = useSidebarStatusContext();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className={`relative md:flex ${className}`}>
      <Sidebar
        className={`top-0 min-w-max fixed md:sticky z-50 md:z-0 ${
          isMenuOpen ? "ml-0" : "-ml-[304px]"
        } md:ml-0`}
        style={{ transition: "0.4s" }}
      />
      <div
        className={`flex flex-col justify-start grow h-screen overflow-auto bg-slate-50 shadow-slate-700/50 z-10 ${
          !sidebarStatus ? "shadow-xl" : "shadow-xs"
        }`}
        style={{ transition: "box-shadow 0.4s ease-in-out" }}
      >
        <Topbar
          className="sticky top-0 z-40 !px-4 md:!px-8"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <div className={`p-4 md:p-8 pb-8 w-full ${contentClassName}`}>
          <div>{children}</div>
          {hasFooter && (
            <div className="text-center md:text-base mt-8">
              <Text as="span" className="text-slate-500">
                &copy; 2022 APIcally team. All rights reserved.
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
