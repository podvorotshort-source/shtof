import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-500",
        scrolled || open
          ? "border-b border-border bg-background/85 py-3 backdrop-blur-md"
          : "border-b border-transparent py-5 md:py-6"
      )}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-16 xl:px-[6.5%]">
        <a href="#top" aria-label="Штофъ — на главную" className="shrink-0">
          <img
            src="/images/logo.png"
            alt="Ресторан Штофъ"
            className={cn("w-auto transition-all duration-500", scrolled || open ? "h-10 md:h-12" : "h-16 md:h-28 xl:h-36")}
          />
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-10 lg:flex xl:gap-16">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-caps relative text-base text-white xl:text-lg transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:text-foreground hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="btn-frame hidden px-6 py-3 text-xs text-white sm:inline-flex xl:text-sm">
            Забронировать столик
          </a>
          <a
            href={site.phoneHref}
            aria-label="Позвонить"
            className="rounded-full border border-border p-2.5 text-foreground sm:hidden"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="rounded-full border border-border p-2.5 text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Мобильная навигация"
            className="overflow-y-auto px-5 sm:px-8 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100svh - 4.25rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <ul className="space-y-6 pt-10">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                >
                  <a href={item.href} onClick={() => setOpen(false)} className="font-display block text-4xl">
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={site.phoneHref} className="btn-frame mb-10 mt-10 w-full text-foreground">
              Забронировать: {site.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
