import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "sage" | "ghost";
  size?: "sm" | "md" | "lg";
  as?: "button" | "link";
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", as = "button", href, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center uppercase font-sans tracking-[0.15em] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-court-navy text-court-cream hover:bg-court-navy/90 focus:ring-court-navy",
      secondary: "bg-transparent border border-court-navy text-court-navy hover:bg-court-navy/5 focus:ring-court-navy",
      sage: "bg-court-sage text-court-cream hover:bg-court-sage/90 focus:ring-court-sage",
      ghost: "bg-transparent text-court-navy hover:bg-court-navy/5 focus:ring-court-navy border-transparent"
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base"
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (as === "link" && href) {
      return (
        <Link href={href} className={classes}>
          {props.children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props} />
    );
  }
);

Button.displayName = "Button";
