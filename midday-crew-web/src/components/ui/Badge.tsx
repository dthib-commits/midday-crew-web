import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "sale" | "new" | "soldOut" | "usapa";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center justify-center uppercase font-sans text-[10px] tracking-widest px-2.5 py-1 rounded-full";
  
  const variants = {
    default: "bg-court-navy text-court-cream",
    sale: "bg-court-terracotta text-white",
    new: "bg-court-green text-white",
    soldOut: "bg-court-charcoal text-white opacity-80",
    usapa: "bg-dink-yellow text-court-charcoal"
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}
