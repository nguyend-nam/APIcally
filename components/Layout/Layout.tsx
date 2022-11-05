import { useState } from "react";
import { useSidebarStatusContext } from "../../context";
import { WithChildren } from "../../types/common";
import { Sidebar } from "../Sidebar";
import { Topbar } from "../Topbar";

export const Layout = ({ children }: WithChildren) => {
  const { sidebarStatus } = useSidebarStatusContext();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="relative md:flex">
      <Sidebar
        className={`top-0 min-w-max fixed md:sticky z-50 md:z-0 ${
          isMenuOpen ? "ml-0" : "-ml-[204px]"
        } md:ml-0`}
        style={{ transition: "0.4s" }}
      />
      <div
        className={`flex flex-col justify-start grow h-screen overflow-auto bg-slate-50 shadow-slate-700/30 z-10 ${
          !sidebarStatus ? "shadow-xl" : "shadow-xs"
        }`}
        style={{ transition: "box-shadow 0.4s ease-in-out" }}
      >
        <Topbar
          className="sticky top-0 z-30"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <div className="p-8 w-full">{children}</div>
      </div>
    </div>
  );
};
