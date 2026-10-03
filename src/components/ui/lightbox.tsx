import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onChange: (index: number | null) => void;
  /** Tall documents (menus) scroll inside the viewer instead of being fitted to the screen. */
  scrollable?: boolean;
}

export function Lightbox({ images, index, onChange, scrollable = false }: LightboxProps) {
  const open = index !== null;
  const count = images.length;

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange((index + 1) % count);
      if (e.key === "ArrowLeft") onChange((index - 1 + count) % count);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, count, onChange]);

  const current = open ? images[index] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className={cn(
            "fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm",
            scrollable ? "overflow-y-auto" : "flex items-center justify-center"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
        >
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className={cn(
              "select-none",
              scrollable
                ? "mx-auto my-16 w-full max-w-5xl px-3 sm:px-6"
                : "max-h-[86vh] max-w-[92vw] rounded-sm object-contain shadow-2xl"
            )}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            aria-label="Закрыть"
            className="fixed right-4 top-4 rounded-full border border-white/20 bg-black/60 p-2.5 text-white transition hover:bg-white hover:text-black"
            onClick={() => onChange(null)}
          >
            <X className="h-5 w-5" />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Предыдущее фото"
                className="fixed left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2.5 text-white transition hover:bg-white hover:text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index! - 1 + count) % count);
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Следующее фото"
                className="fixed right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2.5 text-white transition hover:bg-white hover:text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index! + 1) % count);
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <p className="font-caps fixed bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/70">
                {index! + 1} / {count}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
