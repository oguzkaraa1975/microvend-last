type SellerImageProps = {
  src: string;
  alt: string;
  label: string;
  className: string;
  variant?: "cover" | "logo";
  loading?: "eager" | "lazy";
};

function getInitials(label: string) {
  return label
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase("tr-TR");
}

function SellerImage({
  src,
  alt,
  label,
  className,
  variant = "cover",
  loading = "lazy",
}: SellerImageProps) {
  const isLogo = variant === "logo";

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#edf3fa] via-white to-[#dbe7f2] ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        {isLogo ? (
          <span className="text-xl font-light text-[#4e7bab]">
            {getInitials(label)}
          </span>
        ) : (
          <>
            <span className="mb-3 h-10 w-10 rounded-2xl border border-white/80 bg-white/75 shadow-sm" />
            <span className="text-sm font-light text-[#4e7bab]">{label}</span>
          </>
        )}
      </div>

      <img
        src={src}
        alt={alt}
        loading={loading}
        className="relative h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

export default SellerImage;
