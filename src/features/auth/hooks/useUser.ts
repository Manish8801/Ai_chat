import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../actions/auth.action";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => await getCurrentUser(),
  });
}
