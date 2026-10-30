import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";

// Mandor input (design: .input): focus ring in the ring colour, failed border when invalid.
const fieldClass =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 text-[13px] text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-status-failed";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <InputPrimitive type={type} data-slot="input" className={cn(fieldClass, className)} {...props} />;
}

/** Native select styled like the input; keeps the platform picker and keyboard behaviour. */
function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="native-select"
      className={cn(fieldClass, "cursor-pointer appearance-none bg-no-repeat pr-7", className)}
      style={{
        backgroundImage:
          "linear-gradient(45deg, transparent 50%, var(--muted-foreground) 50%), linear-gradient(135deg, var(--muted-foreground) 50%, transparent 50%)",
        backgroundPosition: "calc(100% - 14px) 52%, calc(100% - 10px) 52%",
        backgroundSize: "4px 4px, 4px 4px",
      }}
      {...props}
    />
  );
}

export { Input, NativeSelect };
