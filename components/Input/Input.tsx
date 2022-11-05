export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  filled?: boolean;
  readOnly?: boolean;
  value?: string;
  invalid?: boolean;
  hasBorder?: boolean;
  onClear?: () => void;
  type?: "text" | "date" | "time" | "email" | "number" | "tel" | "password";
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
