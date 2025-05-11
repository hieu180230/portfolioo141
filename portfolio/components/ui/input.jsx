import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-[48px] rounded-md border border-accent-alt focus:border-border font-light bg-background px-4 py-5 text-primary text-base placeholder:text-primary/65 outline-none",
        className
      )}
      {...props} />
  );
}

export { Input }
