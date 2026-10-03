import { useEffect, useState } from "react";

// Сызрань lives in Samara time (UTC+4); visitors may be elsewhere.
const TIME_ZONE = "Europe/Samara";

function restaurantMinutes() {
  const parts = new Intl.DateTimeFormat("ru-RU", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}

/** Current time at the restaurant in minutes from midnight, refreshed every 30 s. */
export function useRestaurantMinutes() {
  const [minutes, setMinutes] = useState(restaurantMinutes);
  useEffect(() => {
    const id = window.setInterval(() => setMinutes(restaurantMinutes()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return minutes;
}
