type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClasses =
    align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`mb-14 max-w-3xl ${alignClasses}`}>
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-clay">
        {label}
      </p>

      <h2 className="font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 leading-8 text-muted">{description}</p>
      )}
    </div>
  );
}

export default SectionHeading;
