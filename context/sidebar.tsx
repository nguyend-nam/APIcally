import { createContext } from "@dwarvesf/react-utils";
import { useState } from "react";
import { WithChildren } from "../types/common";

const [Provider, useSidebarStatusContext] = createContext<any>();

const SidebarStatusProvider = ({ children }: WithChildren) => {
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(true);

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
