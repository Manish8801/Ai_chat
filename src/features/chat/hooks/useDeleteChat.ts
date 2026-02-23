import { Chat } from "@/generated/prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteChat } from "../actions/chat.actions";

export function useDeleteChat(
  chatId: Chat["id"],
  currentChatId: string | undefined,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => deleteChat(chatId),
    onSuccess: () => {
      toast.success("Chat deleted");
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      if (currentChatId === chatId) router.push("/chats");
    },
    onError: (err) => {
      toast.error("Failed to create chat");
    },
  });
}
