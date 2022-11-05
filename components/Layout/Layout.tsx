import { useSidebarStatusContext } from "../../context";
import { WithChildren } from "../../types/common";
import { Sidebar } from "../Sidebar";
import { Topbar } from "../Topbar";

export const Layout = ({ children }: WithChildren) => {
  const { sidebarStatus } = useSidebarStatusContext();

  return (
    <div className="flex">
      <Sidebar className="sticky top-0 min-w-max" />
      <div
        className={`flex flex-col justify-start grow h-screen overflow-auto bg-slate-50 shadow-slate-700/30 z-10 ${
          !sidebarStatus ? "shadow-xl" : "shadow-xs"
        }`}
        style={{ transition: "box-shadow 0.4s ease-in-out" }}
      >
        <Topbar className="sticky top-0 z-50" />
        <div className="p-8 w-fit">{children}</div>
      </div>
    </div>
  );
};
