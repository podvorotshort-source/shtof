import { cn } from "@/lib/utils";

/** Thin line — diamond — line divider from the reference. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex w-full items-center gap-2", className)}>
      <span className="h-px flex-1 bg-gradient-to-r from-current/0 via-current to-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-2.5 w-2.5 rotate-45 border border-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-px flex-1 bg-gradient-to-l from-current/0 via-current to-current" />
    </div>
  );
}
