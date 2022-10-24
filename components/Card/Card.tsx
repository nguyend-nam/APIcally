import { WithChildren } from "../../types/common";

export const getBorderRadius = (prop: string) => {
  switch (prop) {
    case "top":
      return "rounded-t-2xl";
    case "right":
      return "rounded-r-2xl";
    case "bottom":
      return "rounded-b-2xl";
    case "left":
      return "rounded-l-2xl";
    case "primary":
      return "rounded-r-2xl rounded-bl-2xl";
    case "topRight":
      return "rounded-tr-2xl";
    case "topLeft":
      return "rounded-tl-2xl";
    case "bottomRight":
      return "rounded-br-2xl";
    case "bottomLeft":
      return "rounded-bl-2xl";
    case "full":
      return "rounded-2xl";
  }
};

export const Card = ({
  children,
  hasShadow = true,
  borderRadius = "primary",
  className,
}: WithChildren & {
  hasShadow?: boolean;
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
    | "full";
  className?: string;
}) => {
  return (
    <div
      className={`${getBorderRadius(borderRadius)} ${
        hasShadow && "shadow-lg"
      } ${className}`}
    >
      {children}
    </div>
  );
};
