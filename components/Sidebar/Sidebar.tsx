import {
  createRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useComponentListContext } from "../../context";

interface Props {
  col?: number;
  row?: number;
  setCol: Dispatch<SetStateAction<number | undefined>>;
  setRow: Dispatch<SetStateAction<number | undefined>>;
  addComponent: any;
}

export const Sidebar = ({ col, row, setCol, setRow, addComponent }: Props) => {
  const [colBuffer, setColBuffer] = useState<number>();
  const [rowBuffer, setRowBuffer] = useState<number>();
  const colBufferRef = createRef<HTMLInputElement>();
  const rowBufferRef = createRef<HTMLInputElement>();

  const { componentList, removeAllComponent } = useComponentListContext();

  useEffect(() => {
    if (row && col && row >= 1 && row <= 5 && col >= 1 && col <= 12) {
      addComponent({
        containerCol: col,
        containerRow: row,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [col, row]);

  return (
    <div className="p-4 shadow-lg bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="containerCol">Column span (1-12):</label>
        <input
          min={1}
          max={12}
          ref={colBufferRef}
          type="number"
          id="containerCol"
          placeholder="Enter container column"
          className="border border-blue-600 w-full mb-2 rounded-lg p-1"
          onChange={(e: any) => {
            setColBuffer(e.currentTarget.value);
          }}
        />
        {/* <label htmlFor="contentCol">Content column (not work for now):</label>
        <input
          type="number"
          id="contentCol"
          placeholder="Enter content column"
          className="border border-blue-600 w-full mb-2 rounded-md p-1"
        /> */}
        <label htmlFor="containerRow">Row span (1-5):</label>
        <input
          min={1}
          max={5}
          ref={rowBufferRef}
          type="number"
          id="containerRow"
          placeholder="Enter container row"
          className="border border-blue-600 w-full mb-2 rounded-lg p-1"
          onChange={(e: any) => {
            setRowBuffer(e.currentTarget.value);
          }}
        />
        {/* <label htmlFor="contentRow">Content row (not work for now):</label>
        <input
          type="number"
          id="contentRow"
          placeholder="Enter content row"
          className="border border-blue-600 w-full mb-2 rounded-md p-1"
        /> */}
        <button
          type="submit"
          className="rounded-lg bg-blue-600 p-2 text-white cursor-pointer"
          onClick={() => {
            setCol(colBuffer);
            setRow(rowBuffer);

            // @ts-ignore
            setTimeout(() => setRow(null), 1);
            // @ts-ignore
            setTimeout(() => setCol(null), 1);
          }}
        >
          Add component
        </button>
      </form>
      <button
        type="submit"
        className="rounded-lg bg-blue-600 p-2 text-white cursor-pointer mt-2"
        onClick={() => {
          if (componentList.length !== 0) removeAllComponent();
        }}
      >
        Remove all component(s)
      </button>
    </div>
  );
};
