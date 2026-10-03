import React from 'react';
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { Ornament } from '@/components/ui/ornament';

// Prop types for the HeroSection component
interface HeroSectionProps extends Omit<HTMLMotionProps<"section">, "title"> {
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage: string;
}

// Full-bleed hero laid out after ref.png: photo across the whole screen,
// text block on the left, staggered text reveal from the original hero-section-2.
const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ className, title, subtitle, callToAction, backgroundImage, ...props }, ref) => {

    // Animation variants for the container to orchestrate children animations
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.5,
        },
      },
    };

    // Animation variants for individual text/UI elements
    const itemVariants: Variants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex min-h-svh w-full items-center overflow-hidden bg-background text-foreground",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...props}
      >
        {/* Background photo with the clip-path reveal from the original component */}
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-cover bg-[position:72%_center] md:bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', scale: 1.08 }}
          animate={{ clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', scale: 1 }}
          transition={{ duration: 1.4, ease: "circOut" }}
        />
        {/* Keep the left side deep black for the text, as in the reference */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-transparent md:from-background/80 md:via-background/20" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/70 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-20 pt-40 sm:px-8 md:pt-48 lg:px-16 xl:px-[6.5%]">
          <motion.main variants={containerVariants}>
            <motion.h1
              className="font-display text-glow text-[2.6rem] leading-[1.08] tracking-[0.08em] text-white sm:text-6xl lg:text-7xl xl:text-[6.1rem] [&_.line]:block sm:[&_.line]:whitespace-nowrap"
              variants={itemVariants}
            >
              {title}
            </motion.h1>
            <motion.div className="my-7 w-full max-w-[29rem] text-white/85 md:my-9" variants={itemVariants}>
              <Ornament />
            </motion.div>
            <motion.p
              className="mb-10 max-w-[32rem] text-base leading-[1.75] text-white/90 sm:text-lg lg:text-xl"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
            <motion.a
              href={callToAction.href}
              className="btn-frame px-14 py-4 text-sm text-white sm:text-base"
              variants={itemVariants}
            >
              {callToAction.text}
            </motion.a>
          </motion.main>
        </div>
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
