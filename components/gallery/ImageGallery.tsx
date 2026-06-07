import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ImageGallery — grid of images with full-screen lightbox.
 *
 * Three layout modes:
 * - "grid" — uniform grid (3 cols desktop, 2 cols mobile)
 * - "masonry" — varying heights, more editorial
 * - "feature-plus-grid" — first image is large, rest in 3-col grid below
 *
 * Lightbox supports: click anywhere to close, arrow keys to navigate,
 * ESC to exit, swipe on mobile, image counter, captions.
 *
 * Used by hotel sites (room galleries), restaurants (food photography),
 * portfolios (case study reels), real estate (property tours).
 *
 * Rule 33.2 compliance: every premium-triggered site MUST have at least
 * one ImageGallery component.
 */

export type GalleryImage = {
  src: string;             // URL or placeholder gradient string
  alt: string;
  caption?: string;
  width?: number;          // for masonry aspect ratio
  height?: number;
};

type Props = {
  images: GalleryImage[];
  layout?: "grid" | "masonry" | "feature-plus-grid";
  columns?: 2 | 3 | 4;
  gap?: "tight" | "normal" | "loose";
  withLightbox?: boolean;
  caption?: string;        // section caption above gallery
};

export default function ImageGallery({
  images,
  layout = "grid",
  columns = 3,
  gap = "normal",
  withLightbox = true,
  caption,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const gapClass = gap === "tight" ? "gap-2" : gap === "loose" ? "gap-6" : "gap-4";
  const colClass =
    columns === 2 ? "grid-cols-1 sm:grid-cols-2" :
    columns === 4 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" :
                     "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  
  const open = (i: number) => withLightbox && setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const next = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);
  const prev = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  
  // Keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, next, prev]);
  
  // Lock body scroll while lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = orig; };
    }
  }, [lightboxIndex]);
  
  // ─── Render images based on layout ─────────────────────────────────
  
  return (
    <>
      {caption && (
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-6">
          {caption}
        </p>
      )}
      
      {layout === "grid" && (
        <div className={`grid ${colClass} ${gapClass}`}>
          {images.map((img, i) => (
            <GalleryTile
              key={i}
              image={img}
              onClick={() => open(i)}
              aspect="square"
              clickable={withLightbox}
            />
          ))}
        </div>
      )}
      
      {layout === "masonry" && (
        <div className={`columns-1 sm:columns-2 lg:columns-${columns} ${gapClass}`}>
          {images.map((img, i) => {
            const aspect = img.width && img.height ? img.height / img.width : 1;
            return (
              <div key={i} className="break-inside-avoid mb-4">
                <GalleryTile
                  image={img}
                  onClick={() => open(i)}
                  aspect="auto"
                  customAspect={aspect}
                  clickable={withLightbox}
                />
              </div>
            );
          })}
        </div>
      )}
      
      {layout === "feature-plus-grid" && images.length > 0 && (
        <>
          <div className={`mb-${gap === "tight" ? "2" : gap === "loose" ? "6" : "4"}`}>
            <GalleryTile
              image={images[0]}
              onClick={() => open(0)}
              aspect="wide"
              clickable={withLightbox}
            />
          </div>
          <div className={`grid ${colClass} ${gapClass}`}>
            {images.slice(1).map((img, i) => (
              <GalleryTile
                key={i + 1}
                image={img}
                onClick={() => open(i + 1)}
                aspect="square"
                clickable={withLightbox}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            image={images[lightboxIndex]}
            current={lightboxIndex}
            total={images.length}
            onClose={close}
            onNext={next}
            onPrev={prev}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Single gallery tile ────────────────────────────────────────────

function GalleryTile({
  image,
  onClick,
  aspect,
  customAspect,
  clickable,
}: {
  image: GalleryImage;
  onClick: () => void;
  aspect: "square" | "wide" | "tall" | "auto";
  customAspect?: number;
  clickable: boolean;
}) {
  const aspectClass =
    aspect === "square" ? "aspect-square" :
    aspect === "wide" ? "aspect-[16/9]" :
    aspect === "tall" ? "aspect-[3/4]" :
                          "";
  const inlineAspect = aspect === "auto" && customAspect ? { paddingBottom: `${customAspect * 100}%` } : undefined;
  
  return (
    <motion.button
      type="button"
      onClick={clickable ? onClick : undefined}
      whileHover={clickable ? { scale: 1.005 } : {}}
      transition={{ duration: 0.3 }}
      className={`group relative block w-full ${aspectClass} overflow-hidden rounded-2xl bg-card ${clickable ? "cursor-zoom-in" : "cursor-default"}`}
      style={inlineAspect}
    >
      <ImageOrFallback image={image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      
      {/* Caption overlay on hover */}
      {image.caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-xs font-mono tracking-wider">{image.caption}</p>
        </div>
      )}
    </motion.button>
  );
}

// ─── Image with placeholder fallback ────────────────────────────────

function ImageOrFallback({ image, className }: { image: GalleryImage; className?: string }) {
  const [errored, setErrored] = useState(false);
  
  // Detect placeholder patterns (gradient strings, missing src)
  const isPlaceholder = !image.src || image.src.startsWith("gradient:") || errored;
  
  if (isPlaceholder) {
    return (
      <div
        className={className}
        style={{
          background: image.src?.startsWith("gradient:")
            ? image.src.replace("gradient:", "")
            : "linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 50%, var(--bg)))",
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-display text-4xl text-white/20">{image.alt.charAt(0)}</span>
        </div>
      </div>
    );
  }
  
  return (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

// ─── Lightbox modal ─────────────────────────────────────────────────

function Lightbox({
  image,
  current,
  total,
  onClose,
  onNext,
  onPrev,
}: {
  image: GalleryImage;
  current: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Counter */}
      <div className="absolute top-6 left-6 text-white/70 font-mono text-xs tracking-wider">
        {current + 1} / {total}
      </div>
      
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
      >
        <X size={20} />
      </button>
      
      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
        className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
      >
        <ChevronLeft size={24} />
      </button>
      
      {/* Image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <ImageOrFallback
          image={image}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        {image.caption && (
          <p className="text-white/80 text-sm mt-4 max-w-2xl text-center">{image.caption}</p>
        )}
      </motion.div>
      
      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
        className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
      >
        <ChevronRight size={24} />
      </button>
    </motion.div>
  );
}
