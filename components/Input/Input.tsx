export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  filled?: boolean;
  readOnly?: boolean;
  value?: string | number;
  invalid?: boolean;
  hasBorder?: boolean;
  onClear?: () => void;
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
}

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
  }
};

export const Input = (props: InputProps) => {
  const {
    fullWidth = false,
    disabled = false,
    // invalid = false,
    onFocus,
    onBlur,
    type,
    borderRadius = "primary",
    className,
    value,
    ...rest
  } = props;

  return (
    <div className={`${fullWidth && "w-full"}`}>
      <input
        type={type}
        className={`bg-slate-100 border-none text-lg px-2 py-1 outline-none w-full ${getBorderRadius(
          borderRadius
        )} ${className}`}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
        disabled={disabled}
      />
    </div>
  );
};
