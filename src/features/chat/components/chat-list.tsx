"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EllipsisVertical, SearchIcon } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useDeferredValue, useMemo, useState } from "react";
import { useChats } from "../hooks/useChats";
import { useChatStore } from "../store/useChatStore";
import ChatDeleteDialog from "./chat-delete-dialoge";
import ChatListSkeleton from "./skeletons/chat-list-skeleton";

export default function ChatList() {
  const { chats, fetchingChats } = useChats();
  const { activeChatId } = useChatStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredChats = useMemo(() => {
    const query = deferredQuery.trim().toLowerCase();
    return query
      ? chats?.filter((chat) => chat.title.toLowerCase().includes(query))
      : chats;
  }, [deferredQuery, chats]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search your chat..."
            className={"pl-9 bg-sidebar-accent border-sidebar-b pr-8"}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {fetchingChats ? (
          <ChatListSkeleton />
        ) : (
          <div className="">
            {filteredChats && filteredChats.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground mt-8">
                {searchQuery ? "No Chats Founds" : "No Chats Yet"}
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {filteredChats &&
                  filteredChats.map((chat) => (
                    <li key={chat.id}>
                      <div
                        className={cn(
                          "flex items-center bg-white/10 justify-between rounded-lg text-sm text-sidebar-foreground hover:bg-white/20 transition-colors duration-75 ease-in",
                          chat.id === activeChatId && "bg-white/20",
                        )}
                      >
                        <Link
                          href={`/chats/${chat.id}`}
                          className="flex-1 min-w-0 pl-3 "
                        >
                          <span className="block truncate">{chat.title}</span>
                        </Link>

                        {/* Actions */}
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="p-0">
                              <EllipsisVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="p-1">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-0">
                              <ChatDeleteDialog chatId={chat.id} />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
