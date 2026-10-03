import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { reviewAspects, reviews, site } from "@/data/site";

export function Reviews() {
  return (
    <section id="reviews" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16 xl:px-24">
        <SectionHeading eyebrow="Яндекс Карты" title="Отзывы гостей" />

        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="flex flex-col justify-between rounded-sm border border-border bg-card p-8">
            <div>
              <div className="flex items-end gap-4">
                <p className="font-display text-7xl leading-none text-primary">{site.rating}</p>
                <div className="pb-1">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {site.ratingCount} · {site.reviewsCount}
                  </p>
                </div>
              </div>
              <ul className="mt-8 space-y-4">
                {reviewAspects.map((a) => (
                  <li key={a.label}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span>{a.label}</span>
                      <span className="text-muted-foreground">{a.value}% положительных</span>
                    </div>
                    <div className="h-px w-full bg-border">
                      <div className="h-px bg-primary" style={{ width: `${a.value}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={site.reviewsHref}
              target="_blank"
              rel="noreferrer"
              className="font-caps mt-8 text-sm text-primary transition-colors hover:text-foreground"
            >
              Все отзывы →
            </a>
          </Reveal>

          {reviews.map((r, i) => (
            <Reveal key={r.author} delay={(i + 1) * 0.1} className="relative rounded-sm border border-border p-8">
              <Quote className="h-8 w-8 text-primary/60" strokeWidth={1} />
              <p className="mt-6 text-lg leading-relaxed text-foreground/90">{r.text}</p>
              <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                <p className="font-caps text-sm">{r.author}</p>
                <p className="text-sm text-muted-foreground">{r.date}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
