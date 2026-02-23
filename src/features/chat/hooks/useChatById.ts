import { Chat } from "@/generated/prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getChatWithMessagesById } from "../actions/chat.actions";

export function useChatById(chatId: Chat["id"]) {
  const { data: result, isPending: fetchingChat } = useQuery({
    queryKey: [chatId],
    queryFn: () => getChatWithMessagesById(chatId),
    refetchOnWindowFocus: false,
  });

  if (!result?.success && !result?.data) {
    return { chat: null, fetchingChat };
  }

  return { chat: result.data, fetchingChat: false };
}
