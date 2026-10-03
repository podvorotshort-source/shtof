import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { nastoykiFlavors, nastoykiSets } from "@/data/site";

function FlavorMarquee() {
  const row = [...nastoykiFlavors, ...nastoykiFlavors];
  return (
    <div className="relative overflow-hidden border-y border-border py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {row.map((f, i) => (
          <span key={i} className="font-display flex items-center gap-10 whitespace-nowrap text-2xl text-foreground/80 sm:text-3xl">
            {f}
            <span aria-hidden className="h-2 w-2 rotate-45 border border-primary" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Nastoyki() {
  return (
    <section id="nastoyki" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-20 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[140px]"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Гордость заведения"
              title={
                <>
                  Авторские
                  <br />
                  настойки
                </>
              }
              className="md:mb-10"
            />
            <Reveal className="space-y-5 text-lg leading-relaxed text-foreground/85">
              <p>
                66 вкусов собственного приготовления — ягодные, фруктовые, пряные и совсем неожиданные: огуречная,
                грибная, «Дзадзики». Любая порция подаётся с закуской.
              </p>
              <p className="text-muted-foreground">
                Собирайтесь компанией и заказывайте подачу «Пьяное дерево» на 12 рюмок или «Ладью» — 28 рюмок для
                большого стола.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
              {nastoykiSets.map((s) => (
                <div key={s.title} className="bg-background p-5 sm:p-6">
                  <p className="font-display text-xl sm:text-2xl">{s.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
                  <p className="font-caps mt-3 text-sm text-primary">{s.price}</p>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="relative grid grid-cols-5 gap-4">
            <Reveal className="col-span-3 row-span-2">
              <img
                src="/images/nastoi-tree.jpg"
                alt="Подача настоек «Пьяное дерево»"
                loading="lazy"
                className="aspect-[3/4] h-full w-full rounded-sm object-cover"
              />
            </Reveal>
            <Reveal delay={0.1} className="col-span-2">
              <img
                src="/images/gallery/g11.jpg"
                alt="Стеллаж с настойками"
                loading="lazy"
                className="aspect-square w-full rounded-sm object-cover"
              />
            </Reveal>
            <Reveal delay={0.2} className="col-span-2">
              <img
                src="/images/ladya.jpg"
                alt="Подача «Ладья» на 28 рюмок"
                loading="lazy"
                className="aspect-square w-full rounded-sm object-cover"
              />
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <FlavorMarquee />
      </div>
    </section>
  );
}
