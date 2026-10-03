import { cn } from "@/lib/utils";
import { Ornament } from "@/components/ui/ornament";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, align = "center", className }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={cn("mb-12 md:mb-16", centered && "text-center", className)}>
      <p className="font-caps mb-4 text-xs text-primary sm:text-sm">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">{title}</h2>
      <div className={cn("mt-6 w-48 text-foreground/60", centered && "mx-auto")}>
        <Ornament />
      </div>
    </Reveal>
  );
}
