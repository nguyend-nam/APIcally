import { WithChildren } from "../../types/common";
import { Sidebar } from "../Sidebar";
import { Topbar } from "../Topbar";

export const Layout = ({ children }: WithChildren) => {
  return (
    <div className="flex">
      <Sidebar className="sticky top-0 min-w-max" />
      <div className="flex flex-col justify-start grow h-screen overflow-auto bg-slate-50">
        <Topbar className="sticky top-0 z-50" />
        <div className="p-8 w-fit">{children}</div>
      </div>
    </div>
  );
};
