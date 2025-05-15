"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional pulse animation (default: true)
   */
  animate?: boolean;
  /**
   * Custom rounded corners (default: "md")
   */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /**
   * Variant style (default: "default")
   */
  variant?: "default" | "light" | "dark";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      animate = true,
      rounded = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const roundedClass = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    }[rounded];

    const variantClass = {
      default: "bg-[#002A6B]",
      light: "bg-[#bfdbfe]/20",
      dark: "bg-[#00112b]",
    }[variant];

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          roundedClass,
          variantClass,
          animate && "animate-pulse",
          className
        )}
        aria-live="polite"
        aria-busy={animate}
        {...props}
      >
        {/* Shimmer effect for better visual feedback */}
        {animate && (
          <div
            className={cn(
              "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#bfdbfe]/10 to-transparent",
              "shimmer-animation"
            )}
          />
        )}
      </div>
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };