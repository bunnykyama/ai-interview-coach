import type { ReactNode } from "react";
import { useFadeIn } from "../hooks/useFadeIn";
import { cn } from "../lib/utils";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: 0 | 100 | 200 | 300;
}

export function FadeInSection({
  children,
  className,
  delay = 0,
}: FadeInSectionProps) {
  const ref = useFadeIn<HTMLDivElement>();

  const delayClass =
    delay === 100
      ? "delay-100"
      : delay === 200
        ? "delay-200"
        : delay === 300
          ? "delay-300"
          : "";

  return (
    <div ref={ref} className={cn("fade-in-section", delayClass, className)}>
      {children}
    </div>
  );
}
