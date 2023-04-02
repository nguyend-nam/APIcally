import { ReactElement } from "react";
import cx from "classnames";

const getBorderColor = (type: "alert" | "info" | "success" | "warning") => {
  switch (type) {
    case "alert":
      return "border-red-600";
    case "info":
      return "border-primary";
    case "success":
      return "border-green-600";
    case "warning":
    default:
      return "border-yellow-600";
  }
};
const getBgColor = (type: "alert" | "info" | "success" | "warning") => {
  switch (type) {
    case "alert":
      return "bg-red-200";
    case "info":
      return "bg-blue-200";
    case "success":
      return "bg-green-200";
    case "warning":
    default:
      return "bg-yellow-200";
  }
};

export const Alert = ({
  type = "alert",
  message,
  className,
}: {
  type?: "alert" | "info" | "success" | "warning";
  message: string | ReactElement;
  className?: string;
}) => {
  return (
    <div
      className={cx(
        "text-gray-600 font-light text-base border p-1.5 rounded-b-md rounded-r-md",
        getBorderColor(type),
        getBgColor(type),
        className
      )}
    >
      {message}
    </div>
  );
};
