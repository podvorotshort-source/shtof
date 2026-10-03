import { useEffect, useState } from "react";
import { restaurantNow } from "@/lib/restaurant-time";

/** Current time at the restaurant in minutes from midnight, refreshed every 30 s. */
export function useRestaurantMinutes() {
  const [minutes, setMinutes] = useState(() => restaurantNow().minutes);
  useEffect(() => {
    const id = window.setInterval(() => setMinutes(restaurantNow().minutes), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return minutes;
}
