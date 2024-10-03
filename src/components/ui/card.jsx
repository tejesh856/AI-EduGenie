import * as React from "react";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const NormalCard = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
      className
    )}
    {...props}
  />
));
NormalCard.displayName = "Card";

const NormalCardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
NormalCardHeader.displayName = "CardHeader";

const NormalCardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
NormalCardTitle.displayName = "CardTitle";

const NormalCardDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
      {...props}
    />
  )
);
NormalCardDescription.displayName = "CardDescription";

const NormalCardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
NormalCardContent.displayName = "CardContent";

const NormalCardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
NormalCardFooter.displayName = "CardFooter";
const Card = motion(NormalCard);
const CardHeader = motion(NormalCardHeader);
const CardFooter = motion(NormalCardFooter);
const CardTitle = motion(NormalCardTitle);
const CardDescription = motion(NormalCardDescription);
const CardContent = motion(NormalCardContent);

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
