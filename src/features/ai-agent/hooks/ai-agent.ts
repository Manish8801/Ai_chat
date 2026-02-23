import { Models } from "@/features/chat/types/model.types";
import { useQuery } from "@tanstack/react-query";

export default function useAiAgent() {
  const { data: models, isPending: fetchingModels } = useQuery<Models>({
    queryKey: ["ai-models"],
    queryFn: () => fetch("/api/ai/get-models").then((res) => res.json()),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { models, fetchingModels };
}
