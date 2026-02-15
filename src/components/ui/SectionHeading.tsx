type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleAs?: "h1" | "h2";
  className?: string;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  titleAs = "h2",
  className,
}: SectionHeadingProps) {
  const HeadingTag = titleAs;

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">{eyebrow}</p>
      ) : null}
      <HeadingTag className="mt-2 text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </HeadingTag>
      {description ? <p className="mt-3 text-pretty text-base text-slate-600">{description}</p> : null}
    </div>
  );
}
