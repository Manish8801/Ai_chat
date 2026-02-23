import { Skeleton } from "@/components/ui/skeleton";

export default function ChatListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-10" />
      ))}
    </div>
  );
}
