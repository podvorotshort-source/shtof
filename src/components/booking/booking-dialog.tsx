import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock, Loader2, Minus, Phone, Plus, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Ornament } from "@/components/ui/ornament";
import { addDays, bookingSlots, restaurantNow } from "@/lib/restaurant-time";
import { site } from "@/data/site";

const MAX_GUESTS = 20;
const BOOK_AHEAD_DAYS = 60;

type Status = "idle" | "sending" | "sent" | "error";

/** Formats what the visitor types or pastes as +7 (XXX) XXX-XX-XX. */
function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  // "+7…" already carries the country code; a bare leading 8 or 7 is the trunk/country prefix
  const national = raw.trim().startsWith("+7") || /^[78]/.test(digits) ? digits.slice(1) : digits;
  const p = national.slice(0, 10);
  let out = "+7";
  if (p.length) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

const phoneDigits = (v: string) => v.replace(/\D/g, "");

function initialDate() {
  const now = restaurantNow();
  return bookingSlots(now.date, now).length ? now.date : addDays(now.date, 1);
}

const fieldClass =
  "w-full rounded-md border border-input bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none [color-scheme:dark]";

export function BookingDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const openedAt = useRef(0);
  const firstField = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const today = restaurantNow().date;
  const slots = useMemo(() => bookingSlots(date), [date]);
  const selectedTime = slots.includes(time) ? time : "";

  useEffect(() => {
    if (!open) return;
    openedAt.current = Date.now();
    lastFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstField.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus();
    };
  }, [open, onClose]);

  const close = () => {
    onClose();
    // Start fresh next time once a request went through
    if (status === "sent") {
      setStatus("idle");
      setName("");
      setPhone("");
      setComment("");
      setConsent(false);
      setTime("");
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Укажите, пожалуйста, имя.");
    if (phoneDigits(phone).length !== 11) return setError("Проверьте номер телефона — нужно 10 цифр после +7.");
    if (!selectedTime) return setError("Выберите время.");
    if (!consent) return setError("Нужно согласие на обработку персональных данных.");
    if (!site.bookingEndpoint) {
      setStatus("error");
      return setError("Онлайн-бронь ещё не подключена.");
    }

    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15_000);
    try {
      const res = await fetch(site.bookingEndpoint, {
        method: "POST",
        // text/plain keeps this a "simple" request, which Apps Script accepts without a CORS preflight
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          date,
          time: selectedTime,
          guests,
          comment: comment.trim(),
          website: honeypot,
          elapsedMs: Date.now() - openedAt.current,
        }),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!data?.ok) throw new Error(data?.error || "send failed");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message !== "send failed" && err.name !== "AbortError" ? err.message : "");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="relative max-h-[94svh] w-full overflow-y-auto rounded-t-xl border border-border bg-card px-5 pb-8 pt-8 shadow-2xl sm:max-w-xl sm:rounded-xl sm:px-10 sm:pb-10"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <button
              type="button"
              aria-label="Закрыть"
              onClick={close}
              className="absolute right-4 top-4 rounded-full border border-border p-2 text-foreground/80 transition hover:bg-foreground hover:text-background"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center">
              <img src="images/logo.png" alt="" className="mx-auto h-14 w-auto" />
              <h2 id="booking-title" className="font-display mt-5 text-3xl sm:text-4xl">
                Бронирование столика
              </h2>
              <div className="mx-auto mt-4 w-40 text-foreground/50">
                <Ornament />
              </div>
            </div>

            {status === "sent" ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-green-500" strokeWidth={1.5} />
                <p className="font-display mt-6 text-2xl">Заявка отправлена</p>
                <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
                  Спасибо, {name.trim()}! Администратор перезвонит вам по номеру {phone}, чтобы подтвердить бронь.
                </p>
                <button type="button" onClick={close} className="btn-frame mt-8 text-foreground">
                  Хорошо
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-8 space-y-5">
                {/* Hidden from people; bots that fill every field get filtered on the server */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-caps mb-2 block text-xs text-muted-foreground">Имя</span>
                    <input
                      ref={firstField}
                      type="text"
                      autoComplete="given-name"
                      maxLength={60}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="font-caps mb-2 block text-xs text-muted-foreground">Телефон</span>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      placeholder="+7 (___) ___-__-__"
                      className={fieldClass}
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-caps mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" /> Дата
                    </span>
                    <input
                      type="date"
                      required
                      min={today}
                      max={addDays(today, BOOK_AHEAD_DAYS)}
                      value={date}
                      onChange={(e) => e.target.value && setDate(e.target.value)}
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="font-caps mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> Время
                    </span>
                    <select
                      required
                      value={selectedTime}
                      onChange={(e) => setTime(e.target.value)}
                      className={cn(fieldClass, "appearance-none", !selectedTime && "text-muted-foreground/60")}
                    >
                      <option value="" disabled>
                        {slots.length ? "Выберите время" : "На эту дату мест нет"}
                      </option>
                      {slots.map((s) => (
                        <option key={s} value={s} className="text-foreground">
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <span className="font-caps mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> Количество гостей
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Меньше гостей"
                      disabled={guests <= 1}
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="rounded-md border border-input p-3 transition hover:border-primary disabled:opacity-40"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <output aria-live="polite" className="font-display w-14 text-center text-3xl">
                      {guests}
                    </output>
                    <button
                      type="button"
                      aria-label="Больше гостей"
                      disabled={guests >= MAX_GUESTS}
                      onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                      className="rounded-md border border-input p-3 transition hover:border-primary disabled:opacity-40"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    {guests >= MAX_GUESTS && (
                      <p className="text-sm text-muted-foreground">Для банкета — позвоните нам</p>
                    )}
                  </div>
                </div>

                <label className="block">
                  <span className="font-caps mb-2 block text-xs text-muted-foreground">Комментарий</span>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Повод, пожелания по столику — на веранде, у окна…"
                    className={cn(fieldClass, "resize-none")}
                  />
                </label>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
                  />
                  <span>Согласен на обработку персональных данных (имя и телефон) для бронирования столика</span>
                </label>

                {(error || status === "error") && (
                  <div role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error || "Не удалось отправить заявку."}
                    {status === "error" && (
                      <>
                        {" "}
                        Позвоните нам:{" "}
                        <a href={site.phoneHref} className="whitespace-nowrap underline underline-offset-2">
                          {site.phone}
                        </a>
                      </>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-frame w-full bg-primary py-4 text-primary-foreground hover:bg-foreground disabled:opacity-70"
                  style={{ boxShadow: "inset 0 0 0 3px var(--primary), inset 0 0 0 4px var(--primary-foreground)" }}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Отправляем…
                    </>
                  ) : (
                    "Забронировать"
                  )}
                </button>

                <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  Или позвоните:{" "}
                  <a href={site.phoneHref} className="text-foreground/80 hover:text-primary">
                    {site.phone}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
