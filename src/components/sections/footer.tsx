import { Ornament } from "@/components/ui/ornament";
import { nav, site } from "@/data/site";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative border-t border-border py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 text-center sm:px-8 lg:px-16 xl:px-24">
        <img src="/images/logo.png" alt="Ресторан Штофъ" className="h-20 w-auto" loading="lazy" />
        <p className="font-caps mt-5 text-xs text-muted-foreground">{site.tagline}</p>
        <div className="my-8 w-56 text-foreground/40">
          <Ornament />
        </div>
        <nav aria-label="Навигация в подвале" className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="font-caps text-xs text-foreground/80 transition-colors hover:text-primary">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="mt-8 text-sm text-muted-foreground">
          {site.city}, {site.address} ·{" "}
          <a href={site.phoneHref} className="transition-colors hover:text-foreground">
            {site.phone}
          </a>
        </p>
        <p className="mt-6 text-xs text-muted-foreground/70">
          © {YEAR} Ресторан «Штофъ». Чрезмерное употребление алкоголя вредит вашему здоровью. 18+
        </p>
      </div>
    </footer>
  );
}
