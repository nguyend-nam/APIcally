/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";

export interface componentObj {
  containerCol: number;
  containerRow: number;
}

export const ComponentListContext = createContext({
  componentList: [] as componentObj[],
  addComponent: (newComp: componentObj) => {
    console.log(newComp);
  },
  removeComponent: (i: number) => {
    console.log(i);
  },
  removeAllComponent: () => {},
  setComponentList: undefined as any,
});
