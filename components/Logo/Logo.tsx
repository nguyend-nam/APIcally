import { Image } from "antd";

const getSize = (prop: string) => {
  switch (prop) {
    case "sm":
      return 60;
    case "md":
      return 90;
    case "lg":
      return 120;
    case "xl":
      return 150;
  }
};

export const Logo = ({
  hasBg = false,
  hasText = false,
  textTheme = "dark",
  size = "md",
  className,
}: {
  hasBg?: boolean;
  hasText?: boolean;
  textTheme?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) => {
  if (hasBg && !hasText) {
    return (
      <Image
        width={getSize(size)}
        preview={false}
        src="img/logo.png"
        className={className}
      />
    );
  }
  if (hasBg && hasText) {
    return (
      <Image
        width={getSize(size)}
        preview={false}
        src="img/logo-text.png"
        className={className}
      />
    );
  }
  if (!hasBg && hasText) {
    if (textTheme === "light") {
      return (
        <Image
          width={getSize(size)}
          preview={false}
          src="img/logo-text-transparent-light.png"
          className={className}
        />
      );
    }
    if (textTheme === "dark") {
      return (
        <Image
          width={getSize(size)}
          preview={false}
          src="img/logo-text-transparent.png"
          className={className}
        />
      );
    }
  }
  return (
    <Image
      width={getSize(size)}
      preview={false}
      src="img/logo-transparent.png"
      className={className}
    />
  );
};
