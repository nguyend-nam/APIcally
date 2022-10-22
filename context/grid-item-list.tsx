import { createContext } from "@dwarvesf/react-utils";
import { useState } from "react";
import { WithChildren } from "../types/common";

export interface componentObj {
  containerCol: number;
  containerRow: number;
}

const defaultValue: componentObj[] = [
  { containerCol: 2, containerRow: 3 },
  { containerCol: 8, containerRow: 2 },
  { containerCol: 3, containerRow: 1 },
  { containerCol: 2, containerRow: 2 },
  { containerCol: 1, containerRow: 1 },
];

const [Provider, useComponentListContext] = createContext<any>();

const ComponentListProvider = ({ children }: WithChildren) => {
  // utils for GRID ITEMS context
  const [componentList, setComponentList] =
    useState<componentObj[]>(defaultValue);

  const addComponent = (newComp: componentObj) => {
    setComponentList(() => [...componentList, newComp]);
  };

  const removeComponent = (index: number) => {
    const newArr: componentObj[] = [];

    componentList.forEach((component: componentObj, styleId: number) => {
      if (styleId !== index) newArr.push(component);
    });
    setComponentList(newArr);
  };

  const removeAllComponent = () => {
    const newArr: componentObj[] = [];
    setComponentList(newArr);
  };

  return (
    <Provider
      value={{
        componentList,
        addComponent,
        removeComponent,
        removeAllComponent,
        setComponentList,
      }}
    >
      {children}
    </Provider>
  );
};

export { ComponentListProvider, useComponentListContext };
