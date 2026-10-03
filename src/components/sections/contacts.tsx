import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/data/site";

export function Contacts() {
  return (
    <section id="contacts" className="relative border-t border-border bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16 xl:px-24">
        <SectionHeading eyebrow="Ждём в гости" title="Контакты" />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal className="space-y-10">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
              <div>
                <p className="font-caps mb-2 text-xs text-muted-foreground">Адрес</p>
                <p className="text-xl">
                  {site.city}, {site.address}
                </p>
                <p className="mt-1 text-muted-foreground">{site.landmark}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
              <div>
                <p className="font-caps mb-2 text-xs text-muted-foreground">Бронирование столов</p>
                <a href={site.phoneHref} className="text-xl transition-colors hover:text-primary">
                  {site.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
              <div className="w-full max-w-sm">
                <p className="font-caps mb-3 text-xs text-muted-foreground">Время работы</p>
                <dl className="space-y-2.5">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex items-baseline gap-3">
                      <dt>{h.days}</dt>
                      <span aria-hidden className="flex-1 border-b border-dotted border-border" />
                      <dd className="text-foreground/90">{h.time}</dd>
                    </div>
                  ))}
                  <div className="flex items-baseline gap-3 text-primary">
                    <dt>Бизнес-ланч</dt>
                    <span aria-hidden className="flex-1 border-b border-dotted border-primary/40" />
                    <dd>{site.lunch}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a href={site.phoneHref} className="btn-frame text-foreground">
                <Phone className="h-4 w-4" /> Позвонить
              </a>
              <a href={site.routeHref} target="_blank" rel="noreferrer" className="btn-frame text-foreground">
                <Navigation className="h-4 w-4" /> Маршрут
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative min-h-[380px] overflow-hidden rounded-sm border border-border lg:min-h-[520px]">
            <iframe
              title="Ресторан «Штофъ» на Яндекс Картах"
              src={site.mapWidget}
              className="absolute inset-0 h-full w-full saturate-[0.55]"
              loading="lazy"
              allowFullScreen
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
