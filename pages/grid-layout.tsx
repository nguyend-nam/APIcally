import { useContext, useState } from "react";
import { GridLayout } from "../components/GridLayout";
import { Sidebar } from "../components/Sidebar";
import SidebarList from "../components/Sidebar/SidebarList";
import { ComponentListContext, componentObj } from "../context";
import { arrayMoveImmutable } from "array-move";

const GridLayoutPage = () => {
  const [col, setCol] = useState<number>();
  const [row, setRow] = useState<number>();

  const contextValue = useContext(ComponentListContext);

  const { addComponent, setComponentList } = contextValue;

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: any;
    newIndex: any;
  }) => {
    setComponentList((prevItem: componentObj[]) =>
      arrayMoveImmutable(prevItem, oldIndex, newIndex)
    );
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="max-h-screen overflow-scroll bg-gray-50 w-[400px]">
        <div className="sticky top-0">
          <Sidebar
            col={col}
            row={row}
            setCol={setCol}
            setRow={setRow}
            addComponent={addComponent}
          />
        </div>
        <SidebarList onSortEnd={onSortEnd} />
      </div>
      <div className="w-full border-gray-200 p-1">
        <GridLayout />
      </div>
    </div>
  );
};

export default GridLayoutPage;
