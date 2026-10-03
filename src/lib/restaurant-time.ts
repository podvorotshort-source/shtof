// Сызрань lives in Samara time (UTC+4); visitors may be elsewhere.
export const RESTAURANT_TIME_ZONE = "Europe/Samara";

export interface RestaurantNow {
  /** Calendar date at the restaurant, YYYY-MM-DD. */
  date: string;
  /** Minutes from midnight at the restaurant. */
  minutes: number;
}

export function restaurantNow(at = new Date()): RestaurantNow {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: RESTAURANT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(at);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/** Adds days to a YYYY-MM-DD string without touching time zones. */
export function addDays(date: string, days: number) {
  const [y, m, d] = date.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + days));
  return next.toISOString().slice(0, 10);
}

/** 0 = Sunday … 6 = Saturday, for a YYYY-MM-DD string. */
export function weekday(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function formatMinutes(total: number) {
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const OPEN = 12 * 60;
const SLOT = 30;
/** Last table can be booked an hour before closing. */
const LAST_BOOKING_GAP = 60;
/** Same-day bookings need at least this much notice. */
const MIN_NOTICE = 30;

/** Closing time in minutes from the opening day's midnight: Fri/Sat 01:00, otherwise 00:00. */
function closingMinutes(date: string) {
  const day = weekday(date);
  return day === 5 || day === 6 ? 25 * 60 : 24 * 60;
}

/** Bookable time slots ("HH:MM") for a date, skipping the past when the date is today. */
export function bookingSlots(date: string, now: RestaurantNow = restaurantNow()) {
  const last = closingMinutes(date) - LAST_BOOKING_GAP;
  const earliest = date === now.date ? Math.max(OPEN, now.minutes + MIN_NOTICE) : OPEN;
  const slots: string[] = [];
  for (let t = OPEN; t <= last; t += SLOT) {
    if (t >= earliest) slots.push(formatMinutes(t));
  }
  return slots;
}
