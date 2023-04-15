import { createContext } from "@dwarvesf/react-utils";
import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { WithChildren } from "../types/common";

const [Provider, useSidebarStatusContext] = createContext<any>();

const SidebarStatusProvider = ({ children }: WithChildren) => {
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile && !sidebarStatus) {
      setSidebarStatus(true);
    }
  }, [isMobile, sidebarStatus]);

  return (
    <Provider
      value={{
        sidebarStatus,
        setSidebarStatus,
      }}
    >
      {children}
    </Provider>
  );
};

export { SidebarStatusProvider, useSidebarStatusContext };
