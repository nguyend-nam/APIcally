import { Spin } from "antd";
import { ReactNode } from "react";

export const getBorderRadius = (prop: string) => {
  switch (prop) {
    case "top":
      return "rounded-t-md";
    case "right":
      return "rounded-r-md";
    case "bottom":
      return "rounded-b-md";
    case "left":
      return "rounded-l-md";
    case "primary":
      return "rounded-r-md rounded-bl-md";
    case "topRight":
      return "rounded-tr-md";
    case "topLeft":
      return "rounded-tl-md";
    case "bottomRight":
      return "rounded-br-md";
    case "bottomLeft":
      return "rounded-bl-md";
    case "full":
      return "rounded-md";
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
    style,
    ...rest
  } = props;
  return (
    <button
      className={`text-base md:text-lg p-2.5 py-1 transition-all duration-150 ${getButtonStyle(
        appearance
      )} ${getBorderRadius(borderRadius)} ${className}`}
      disabled={isLoading}
      style={style}
      {...rest}
    >
      {label}
      {isLoading ? (
        <span className="ml-2">
          <Spin size="small" />
        </span>
      ) : null}
    </button>
  );
};
