import { Spin } from "antd";
import { ReactNode } from "react";

export const getBorderRadius = (prop: string) => {
  switch (prop) {
    case "top":
      return "rounded-t-lg";
    case "right":
      return "rounded-r-lg";
    case "bottom":
      return "rounded-b-lg";
    case "left":
      return "rounded-l-lg";
    case "primary":
      return "rounded-r-lg rounded-bl-lg";
    case "topRight":
      return "rounded-tr-lg";
    case "topLeft":
      return "rounded-tl-lg";
    case "bottomRight":
      return "rounded-br-lg";
    case "bottomLeft":
      return "rounded-bl-lg";
    case "full":
      return "rounded-lg";
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
      className={`text-base md:text-lg p-2.5 py-1 ${getButtonStyle(
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
