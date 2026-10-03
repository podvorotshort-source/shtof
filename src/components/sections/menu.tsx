import { Fragment, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { signatureDishes } from "@/data/site";
import { menuSections, type MenuItem } from "@/data/menu";
import { useRestaurantMinutes } from "@/hooks/use-restaurant-minutes";

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li className="break-inside-avoid py-4">
      <div className="flex items-baseline gap-3">
        <h4 className="text-lg font-normal leading-snug text-foreground">
          {item.name}
          {item.tag === "spicy" && <Flame aria-label="острое" className="ml-1.5 inline h-4 w-4 -translate-y-0.5 text-red-400" />}
          {item.tag === "veg" && <Leaf aria-label="вегетарианское" className="ml-1.5 inline h-4 w-4 -translate-y-0.5 text-green-400" />}
        </h4>
        <span aria-hidden className="min-w-6 flex-1 translate-y-[-0.3rem] border-b border-dotted border-foreground/25" />
        <span className="font-caps whitespace-nowrap text-base text-primary">{item.price} ₽</span>
      </div>
      {(item.desc || item.weight) && (
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {item.desc}
          {item.desc && item.weight && " · "}
          {item.weight && <span className="whitespace-nowrap text-foreground/60">{item.weight}</span>}
        </p>
      )}
    </li>
  );
}

export function MenuSection() {
  const [sectionId, setSectionId] = useState(menuSections[0].id);
  const section = menuSections.find((s) => s.id === sectionId)!;
  const [categoryId, setCategoryId] = useState(section.categories[0].id);
  const category = section.categories.find((c) => c.id === categoryId) ?? section.categories[0];
  const listTop = useRef<HTMLDivElement>(null);
  const now = useRestaurantMinutes();

  // Bring the list start into view when the tabs bar is stuck far below it
  const scrollToList = () => {
    const top = listTop.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pickSection = (id: string) => {
    const next = menuSections.find((s) => s.id === id)!;
    setSectionId(id);
    setCategoryId(next.categories[0].id);
    scrollToList();
  };

  const pickCategory = (id: string) => {
    setCategoryId(id);
    scrollToList();
  };

  // Split long lists into two balanced columns on desktop, preferring a sub-heading boundary
  const items = category.items;
  const groupStarts = items.map((it, i) => (it.group && i > 0 ? i : -1)).filter((i) => i > 0);
  const middle = Math.ceil(items.length / 2);
  const half = groupStarts.length
    ? groupStarts.reduce((best, i) => (Math.abs(i - middle) < Math.abs(best - middle) ? i : best))
    : middle;
  const columns = category.items.length > 6 ? [category.items.slice(0, half), category.items.slice(half)] : [category.items];

  return (
    <section id="menu" className="relative border-t border-border bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16 xl:px-24">
        <SectionHeading eyebrow="Кухня и бар" title="Меню" />

        {/* Signature dishes */}
        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {signatureDishes.map((dish, i) => (
            <Reveal key={dish.title} delay={i * 0.1} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm md:aspect-[4/5]">
                <img
                  src={dish.src}
                  alt={dish.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-caps mb-2 text-[11px] text-primary">Фирменное блюдо</p>
                  <h3 className="font-display text-2xl leading-tight sm:text-3xl">{dish.title}</h3>
                  <p className="mt-2 text-sm text-foreground/75">{dish.note}</p>
                  <p className="font-caps mt-4 text-sm text-foreground">{dish.price}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div ref={listTop} className="scroll-mt-20" />

        {/* Tabs: menu section, then categories inside it */}
        <div className="sticky top-[4.1rem] z-30 -mx-5 border-b border-border bg-background/95 px-5 pb-4 pt-4 backdrop-blur-md sm:-mx-8 sm:px-8 md:top-[4.6rem] lg:mx-0 lg:rounded-sm lg:border lg:px-6">
          <div role="tablist" aria-label="Разделы меню" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {menuSections.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={s.id === sectionId}
                onClick={() => pickSection(s.id)}
                className={cn(
                  "font-caps flex flex-col items-center justify-center rounded-md border px-3 py-3 text-sm transition-colors duration-300",
                  s.id === sectionId
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground/80 hover:border-foreground/50 hover:text-foreground"
                )}
              >
                {s.title}
                {s.schedule && (() => {
                  const open = now >= s.schedule.from && now < s.schedule.to;
                  return (
                    <span className="mt-1 flex items-center gap-1.5 text-[11px] normal-case tracking-normal">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          open ? "bg-green-500 shadow-[0_0_8px_rgb(34_197_94/0.8)]" : "bg-red-500 shadow-[0_0_8px_rgb(239_68_68/0.7)]"
                        )}
                      />
                      {s.schedule.label}
                      <span className="sr-only">{open ? " — сейчас доступен" : " — сейчас недоступен"}</span>
                    </span>
                  );
                })()}
              </button>
            ))}
          </div>

          <div
            role="tablist"
            aria-label="Категории"
            className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {section.categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={c.id === category.id}
                onClick={() => pickCategory(c.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                  c.id === category.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground/75 hover:border-foreground/50 hover:text-foreground"
                )}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="min-h-[420px] pt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${section.id}-${category.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="font-display text-3xl sm:text-4xl">{category.title}</h3>
                {(category.note || section.note) && (
                  <p className="text-sm text-primary/90">{category.note ?? section.note}</p>
                )}
              </div>

              {category.items.length > 0 && (
                <div className={cn("grid gap-x-16", columns.length > 1 && "lg:grid-cols-2")}>
                  {columns.map((col, ci) => (
                    <ul key={ci} className="divide-y divide-border/60">
                      {col.map((item, i) => (
                        <Fragment key={`${item.name}-${i}`}>
                          {item.group && (
                            <li className="font-caps pb-1 pt-6 text-xs text-primary first:pt-2">{item.group}</li>
                          )}
                          <MenuRow item={item} />
                        </Fragment>
                      ))}
                    </ul>
                  ))}
                </div>
              )}

              {category.chips && (
                <ul className="flex flex-wrap gap-2">
                  {category.chips.map((chip) => (
                    <li key={chip} className="rounded-full border border-border px-4 py-2 text-sm text-foreground/85">
                      {chip}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
