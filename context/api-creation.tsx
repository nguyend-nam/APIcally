import { createContext } from "@dwarvesf/react-utils";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import FormData from "form-data";
import { WithChildren } from "../types/common";

export interface ApiCreationContextValues {
  apiName: string;
  apiDisplayName: string;
  apiDescription?: string;
  setApiName: Dispatch<SetStateAction<string>>;
  setApiDisplayName: Dispatch<SetStateAction<string>>;
  setApiDescription: Dispatch<SetStateAction<string>>;
  filesData: FormData;
}

const [Provider, useApiCreationContext] =
  createContext<ApiCreationContextValues>();

const ApiCreationContextProvider = ({ children }: WithChildren) => {
  const [apiName, setApiName] = useState<string>("");
  const [apiDisplayName, setApiDisplayName] = useState<string>("");
  const [apiDescription, setApiDescription] = useState<string>("");
  const filesData = useMemo(() => new FormData(), []);

  return (
    <Provider
      value={{
        apiName,
        apiDisplayName,
        apiDescription,
        setApiName,
        setApiDescription,
        setApiDisplayName,
        filesData,
      }}
    >
      {children}
    </Provider>
  );
};

export { ApiCreationContextProvider, useApiCreationContext };
