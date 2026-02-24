import { useQuery } from "@tanstack/react-query";
import { getAllChats } from "../actions/chat.actions";
import { Chats } from "../types/types";

export function useChats() {
  const { data: chats, isPending: fetchingChats } = useQuery<Chats>({
    queryKey: ["chats"],
    queryFn: () => getAllChats(),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return { chats, fetchingChats };
}
