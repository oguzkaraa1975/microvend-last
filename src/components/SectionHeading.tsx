type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
};

function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-14 max-w-3xl">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#4e7bab]">
        {label}
      </p>

      <h2 className="text-5xl font-light leading-tight tracking-tight text-gray-900">
        {title}
      </h2>

      {description && (
        <p className="mt-6 font-light leading-8 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;