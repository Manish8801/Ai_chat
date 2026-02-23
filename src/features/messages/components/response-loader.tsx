"use client";
import { Spinner } from "@/components/ui/spinner";

export default function ResponseLoader() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground italic">
      <Spinner className="size-4" />
      AI is thinking...
    </div>
  );
}
