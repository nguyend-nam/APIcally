import { RightOutlined } from "@ant-design/icons";
import cx from "classnames";
import { Text } from "../../../Text";

interface Props {
  title: string;
  onClick: () => void;
  className?: string;
}

export const RowItem = (props: Props) => {
  const { title, onClick, className } = props;
  return (
    <div
      role="button"
      className={cx(
        "flex justify-between items-center bg-slate-50 text-slate-400 p-4",
        className
      )}
      onClick={onClick}
    >
      <Text className="text-base !m-0 capitalize text-info">{title}</Text>
      <RightOutlined />
    </div>
  );
};
