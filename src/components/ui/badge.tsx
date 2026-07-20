import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "text-foreground",
        // Medal variants (PAIO stats)
        gold: "border-yellow-500 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
        silver: "border-gray-400 bg-gradient-to-r from-gray-300 to-gray-500 text-white",
        bronze: "border-amber-600 bg-gradient-to-r from-amber-600 to-orange-700 text-white",
        hm: "border-green-500 bg-gradient-to-r from-green-400 to-green-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
