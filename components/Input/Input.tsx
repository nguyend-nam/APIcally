export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  filled?: boolean;
  readOnly?: boolean;
  value?: string;
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
