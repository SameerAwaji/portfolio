/* eslint-disable @next/next/no-img-element -- Local, pre-sized assets avoid a runtime image proxy and client hydration. */

type ProjectImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  zoom?: boolean;
  locale?: "en" | "ar";
};

const optimized: Record<string, { src: string; srcSet: string }> = {
  "/projects/qarar-account-clean.png": {
    src: "/projects/qarar-account-520.webp",
    srcSet: "/projects/qarar-account-520.webp 520w, /projects/qarar-account-1040.webp 1040w",
  },
  "/projects/maeen-summer-form.png": {
    src: "/projects/maeen-form-1280.webp",
    srcSet: "/projects/maeen-form-640.webp 640w, /projects/maeen-form-1280.webp 1280w",
  },
};

export default function ProjectImage({ src, alt, width, height, sizes, priority, zoom, locale = "en" }: ProjectImageProps) {
  const asset = optimized[src];
  const image = (
    <img
      src={asset?.src ?? src}
      srcSet={asset?.srcSet}
      alt={alt}
      width={width}
      height={height}
      sizes={asset ? sizes : undefined}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );

  if (!zoom) return image;

  // A normal link is also useful before hydration or with JavaScript disabled.
  return (
    <a className="image-zoom" href={src} data-image-viewer aria-label={`${locale === "ar" ? "تكبير الصورة" : "Enlarge image"}: ${alt}`}>
      {image}
      <span className="image-zoom-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="10" cy="10" r="6.5" /><path d="m15 15 6 6M10 7v6M7 10h6" />
        </svg>
      </span>
    </a>
  );
}
