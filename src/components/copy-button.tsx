"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  text: string;
  timeoutDuration?: number;
  className?: string;
};

type CopyState = "idle" | "copied" | "error";

export default function CopyButton({
  text,
  timeoutDuration = 2000,
  className,
}: Props) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const handleCopy = useCallback(async () => {
    if (copyState !== "idle") return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers / non-secure contexts
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.cssText = "position:fixed;left:-9999px;top:-9999px;";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!success) throw new Error("execCommand failed");
      }

      setCopyState("copied");
    } catch {
      setCopyState("error");
    } finally {
      setTimeout(() => setCopyState("idle"), timeoutDuration);
    }
  }, [copyState, text, timeoutDuration]);

  const label =
    copyState === "copied"
      ? "Copied!"
      : copyState === "error"
        ? "Failed"
        : "Copy";

  return (
    <Button
      onClick={handleCopy}
      size="icon"
      variant="ghost"
      type="button"
      aria-label={label}
      title={label}
      disabled={copyState !== "idle"}
      className={cn(
        "relative transition-colors duration-100 ",
        copyState === "copied" && "text-green-500 hover:text-green-500",
        copyState === "error" && "text-red-500 hover:text-red-500",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-100",
          copyState === "copied"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75",
        )}
      >
        <Check className="size-4" />
      </span>
      <span
        className={cn(
          "flex items-center justify-center transition-all duration-100 text-foreground/20",
          copyState !== "idle" ? "opacity-0 scale-75" : "opacity-100 scale-100",
        )}
      >
        <Copy className="size-4" />
      </span>
    </Button>
  );
}
