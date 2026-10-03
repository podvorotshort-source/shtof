import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { BookingDialog } from "@/components/booking/booking-dialog";
import { site } from "@/data/site";

const BookingContext = createContext<{ openBooking: () => void } | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // Until the Apps Script endpoint is configured the button keeps working as a phone call
  const openBooking = useCallback(() => {
    if (site.bookingEndpoint) setOpen(true);
    else window.location.href = site.phoneHref;
  }, []);
  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingDialog open={open} onClose={() => setOpen(false)} />
    </BookingContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
