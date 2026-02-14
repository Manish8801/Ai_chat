import { useQuery } from "@tanstack/react-query";

export default function useAiAgent() {
  return useQuery({
    queryKey: ["ai-models"],
    queryFn: () => fetch("/api/ai/get-models").then((res) => res.json()),
  });
}
