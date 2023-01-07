import { SortableElement } from "react-sortable-hoc";

interface SidebarItemProps {
  col: number;
  row: number;
  itemIndex: number;
  remove: (i: number) => void;
}

const GridSidebarItem = ({
  col: containerCol,
  row: containerRow,
  itemIndex,
  remove: removeComponent,
}: SidebarItemProps) => {
  return (
    <div className="shadow-md p-2 rounded-lg mb-2 bg-white">
      <div className="flex justify-between items-center text-lg">
        <span className="text-blue-600">{itemIndex}</span>
        <button
          onClick={() => removeComponent(itemIndex)}
          className="text-blue-600 font-bold text-2xl"
        >
          &#215;
        </button>
      </div>
      <ul className="font-light">
        <li>Column span: {containerCol}</li>
        <li>Row span: {containerRow}</li>
      </ul>
    </div>
  );
};

export default SortableElement(GridSidebarItem);
