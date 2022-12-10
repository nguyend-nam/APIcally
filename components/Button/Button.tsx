import { Spin } from "antd";
import { ReactNode } from "react";

export const getBorderRadius = (prop: string) => {
  switch (prop) {
    case "top":
      return "rounded-t-xl";
    case "right":
      return "rounded-r-xl";
    case "bottom":
      return "rounded-b-xl";
    case "left":
      return "rounded-l-xl";
    case "primary":
      return "rounded-r-xl rounded-bl-xl";
    case "topRight":
      return "rounded-tr-xl";
    case "topLeft":
      return "rounded-tl-xl";
    case "bottomRight":
      return "rounded-br-xl";
    case "bottomLeft":
      return "rounded-bl-xl";
    case "full":
      return "rounded-xl";
    case "none":
      return "rounded-none";
  }
};

const getButtonStyle = (prop: string) => {
  switch (prop) {
    case "primary":
      return "bg-primary text-white hover:bg-primary/90";
    case "outline":
      return "bg-none border border-primary text-primary";
    case "link":
      return "border-none bg-none text-primary";
  }
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "primary"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "full"
    | "none";
  label: ReactNode;
  className?: string;
  appearance?: "primary" | "link" | "outline";
  isLoading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    borderRadius = "primary",
    label,
    className,
    appearance = "primary",
    isLoading = false,
    ...rest
  } = props;
  return (
    <button
      className={`${getButtonStyle(appearance)} ${getBorderRadius(
        borderRadius
      )} ${className}`}
      disabled={isLoading}
      {...rest}
    >
      {label}
      {isLoading ? (
        <span className="ml-2">
          <Spin />
        </span>
      ) : null}
    </button>
  );
};
