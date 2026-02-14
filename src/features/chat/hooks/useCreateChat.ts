import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createChatWithMessage } from "../actions/chat.actions";

export function useCreateChat() {
  const queryClient = useQueryClient();

  const router = useRouter();
  return useMutation({
    mutationFn: (values: { content: string; model: string }) =>
      createChatWithMessage(values),

    onSuccess: (res) => {
      if (res.success && res.data) {
        const chat = res.data;
        queryClient.invalidateQueries({ queryKey: ["chats"] });
        router.push(`/chat/${chat.id}?autoTrigger=true`);
      }
    },

    onError: (err) => {
      console.log("Create chat error", err);
      toast.error("Failed to create chat");
    },
  });
}
