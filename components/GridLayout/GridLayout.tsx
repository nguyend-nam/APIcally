import { GridComponent } from "../GridComponent";
import { componentObj, useComponentListContext } from "../../context";

export const GridLayout = () => {
  const { componentList, removeComponent } = useComponentListContext();
  return (
    <div className="grid grid-cols-12 grid-rows-5 h-screen gap-1">
      {componentList.map((o: componentObj, i: number) => (
        <GridComponent
          containerCol={o.containerCol}
          containerRow={o.containerRow}
          index={i}
          key={i}
          remove={() => removeComponent(i)}
        />
      ))}
    </div>
  );
};
