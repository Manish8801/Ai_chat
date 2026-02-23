import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import ChatList from "./chat-list";

export default function ChatSidebar() {
  return (
    <>
      {/* desktop */}
      <aside className="hidden md:block border-r w-64">
        <div className="p-4 space-y-4">
          <Link
            href={"/chats"}
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
          >
            <PlusIcon className="" />
            New Chat
          </Link>

          <ChatList />
        </div>
      </aside>
      {/* mobile */}
    </>
  );
}
