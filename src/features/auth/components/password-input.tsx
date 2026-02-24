"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";

function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false);
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPassword) {
      timer = setTimeout(() => setShowPassword(false), 800);
    }
    return () => clearTimeout(timer);
  }, [showPassword]);

  return (
    <div className="relative flex ">
      <input
        aria-label={showPassword ? "Hide password" : "Show password"}
        autoComplete="new-password"
        type={showPassword ? "text" : "password"}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pr-6",
          className,
        )}
        {...props}
      />
      <button
        type="button" // Important: prevents form submission on click
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <Eye className="size-4" aria-hidden="true" />
        ) : (
          <EyeClosed className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export { PasswordInput };
