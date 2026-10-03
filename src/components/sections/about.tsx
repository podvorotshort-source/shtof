import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { features, site } from "@/data/site";

const stats = [
  { value: site.rating, label: "рейтинг на Яндекс Картах" },
  { value: "66", label: "фирменных настоек" },
  { value: "12:00", label: "открываемся каждый день" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-16 xl:px-24">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[4/3] lg:aspect-[4/5]">
            <img
              src="images/about.jpg"
              alt="Зал ресторана «Штофъ» с вывеской"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
          <img
            src="images/sign.jpg"
            alt="Вывеска ресторана ночью"
            loading="lazy"
            className="absolute -bottom-10 -right-2 hidden aspect-square w-44 rounded-sm border-4 border-background object-cover shadow-2xl sm:block md:w-56 lg:-right-10"
          />
          <a
            href={site.reviewsHref}
            target="_blank"
            rel="noreferrer"
            className="absolute left-4 top-4 flex items-center gap-2 rounded-sm bg-background/80 px-4 py-2.5 backdrop-blur transition-colors hover:bg-background"
          >
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-caps text-xs">
              {site.rating} · {site.ratingCount}
            </span>
          </a>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="О ресторане"
            title={
              <>
                Уют старого
                <br />
                города
              </>
            }
            className="md:mb-10"
          />
          <Reveal className="space-y-5 text-lg leading-relaxed text-foreground/85">
            <p>
              «Штофъ» — ресторан авторских настоек в историческом центре Сызрани, в ста метрах от Кремля. Кирпичные
              стены, кованые люстры, приглушённый свет и спокойная музыка — место, куда хочется возвращаться.
            </p>
            <p className="text-muted-foreground">
              Настойки готовим сами: от классической клюквы и хреновухи до «Графа Орлова» и макадамии с черносливом.
              К ним — стейки из мраморной телятины на хоспере, фирменные пельмени, корюшка в хрустящей панировке и
              кальмар гриль в ореховом соусе.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid grid-cols-3 gap-4 border-y border-border py-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl text-primary sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-xs leading-snug text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2">
            {features.map((f) => (
              <span key={f} className="font-caps rounded-full border border-border px-4 py-2 text-[11px] text-foreground/80">
                {f}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
