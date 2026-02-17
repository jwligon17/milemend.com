import type { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "security";
  as?: "h1" | "h2";
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function PageTitle({
  children,
  className,
  variant = "default",
  as = "h2",
}: PageTitleProps) {
  const Tag = as;

  return (
    <Tag
      className={cn(
        "page-title",
        variant === "default" && "page-title--default",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
