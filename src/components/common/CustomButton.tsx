"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

const CustomButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn(
        "h-10 lg:h-12 cursor-pointer rounded-sm lg:rounded-md bg-primary px-6 lg:px-8  text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-primary/90 hover:text-white border-none shadow-lg shadow-primary/20 active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
});
CustomButton.displayName = "CustomButton";

export { CustomButton };
