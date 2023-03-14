import { CSSProperties } from "react";
import { WithChildren } from "../../types/common";

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

export const Card = ({
  children,
  hasShadow = true,
  shadowSize = "lg",
  borderRadius = "primary",
  className,
  style,
}: WithChildren & {
  hasShadow?: boolean;
  shadowSize?: "lg" | "md" | "sm";
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
  className?: string;
  style?: CSSProperties;
}) => {
  let shadowClassname;
  switch (shadowSize) {
    case "lg":
      shadowClassname = "shadow-lg";
      break;
    case "md":
      shadowClassname = "shadow-md";
      break;
    default:
      shadowClassname = "shadow";
      break;
  }

  return (
    <div
      style={style}
      className={`bg-white ${getBorderRadius(borderRadius)} ${
        hasShadow && shadowClassname
      } ${className}`}
    >
      {children}
    </div>
  );
};
