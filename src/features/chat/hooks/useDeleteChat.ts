import { Chat } from "@/generated/prisma/client";

export function useDeleteChat(chatId: Chat["id"]) {
  return {
    mutateAsync() {},
    isPending: false,
  };
}
