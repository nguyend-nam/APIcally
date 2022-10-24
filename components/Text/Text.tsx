import { createElement, HTMLAttributes } from "react";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "small" | "b" | "strong" | "i" | "em" | "h6" | "div";
  textColor?: "none" | "1100" | "700" | "800" | "primary";
}

function getColor(color: TextProps["textColor"]) {
  switch (color) {
    case "1100":
      return "text-gray-1100";
    case "700":
      return "text-gray-700";
    case "800":
      return "text-gray-800";
    case "primary":
      return "text-primary";
    default:
      return "";
  }
}

export const Text = (props: TextProps) => {
  const { className, textColor = "1100", as = "p", ...rest } = props;
  const classNames = [getColor(textColor)];

  return createElement(as, {
    className: `${classNames} ${className}`,
    ...rest,
  });
};
