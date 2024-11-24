import { useQuery } from "@tanstack/react-query";
import { getOpportunities } from "../repositories/opportunites.repository";

export function useOpportunities() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["opportunities"],
    queryFn: getOpportunities,
  });

  return { isPending, isError, data };
}
