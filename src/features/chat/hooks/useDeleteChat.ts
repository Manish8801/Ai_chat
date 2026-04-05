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
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["chats"] });
      const previousChats = queryClient.getQueryData(["chats"]);
      queryClient.setQueryData(["chats"], (old: any) => {
        return old?.filter((chat: Chat) => chat.id !== chatId);
      });
      return { previousChats };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onSuccess: () => {
      toast.success("Chat deleted");
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      if (currentChatId === chatId) router.push("/chats");
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["chats"], context?.previousChats);
      toast.error("Failed to delete chat");
    },
  });
}
