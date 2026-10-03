import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/ui/lightbox";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { gallery, site } from "@/data/site";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative border-t border-border bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16 xl:px-24">
        <SectionHeading eyebrow="Интерьер и блюда" title="Галерея" />

        <div className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[230px] lg:grid-cols-4">
          {gallery.map((img, i) => (
            <Reveal
              key={img.src}
              delay={(i % 4) * 0.06}
              className={cn(
                img.span === "big" && "col-span-2 row-span-2",
                img.span === "tall" && "row-span-2"
              )}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Открыть фото: ${img.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <span className="absolute inset-0 bg-background/20 transition-colors duration-500 group-hover:bg-transparent" />
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a href={site.yandexHref} target="_blank" rel="noreferrer" className="btn-frame text-foreground">
            Больше фото на Яндекс Картах
          </a>
        </Reveal>
      </div>

      <Lightbox images={gallery} index={active} onChange={setActive} />
    </section>
  );
}
