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
    <div className={`relative overflow-hidden bg-paper ${className}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/5 px-4 text-center">
        {isLogo ? (
          <span className="text-xl font-medium text-muted">
            {getInitials(label)}
          </span>
        ) : (
          <>
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm border border-ink/10 bg-paper text-sm font-medium text-muted">
              {getInitials(label)}
            </span>
            <span className="text-sm text-muted">{label}</span>
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
