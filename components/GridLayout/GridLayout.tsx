import { GridComponent } from "../GridComponent";
import { ComponentListContext, componentObj } from "../../pages/_app";
import { useContext } from "react";

export const GridLayout = () => {
  const { componentList } = useContext(ComponentListContext);
  return (
    <div className="grid grid-cols-12 grid-rows-5 h-screen gap-1">
      {componentList.map((o: componentObj, i: number) => (
        <GridComponent
          containerCol={o.containerCol}
          containerRow={o.containerRow}
          index={i}
          key={i}
        />
      ))}
    </div>
  );
};
