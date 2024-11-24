import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../client/repositories/clients.repository";
import { getOpportunities } from "../../opportunites/repositories/opportunites.repository";
import React from "react";

export function model() {
  const clients = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
  });

  const opportunities = useQuery({
    queryKey: ["opportunities"],
    queryFn: () => getOpportunities(),
  });

  const clientsWithOpportunities = React.useMemo(() => {
    if (clients.isSuccess && opportunities.isSuccess) {
      const opportunitiesCount = opportunities.data.reduce(
        (
          acc: { [key: number]: { total: number; closed: number } },
          opportunity
        ) => {
          const clientId = opportunity.clientId;

          acc[clientId] = acc[clientId] || { total: 0, closed: 0 };
          acc[clientId].total += opportunity.estimatedValue;

          if (opportunity.status === "Closed") {
            acc[clientId].closed += opportunity.estimatedValue;
          }

          return acc;
        },
        {}
      );

      return clients.data.map((client) => ({
        id: client.id,
        name: client.name,
        opportunitiesCount: opportunitiesCount[client.id]?.total || 0,
        closedOpportunitiesCount: opportunitiesCount[client.id]?.closed || 0,
      }));
    }
    return [];
  }, [
    clients.isSuccess,
    opportunities.isSuccess,
    clients.data,
    opportunities.data,
  ]);

  const opportunitiesByStatus = React.useMemo(() => {
    if (opportunities.isSuccess) {
      const statusCount = opportunities.data.reduce(
        (acc: { [key: string]: number }, opportunity) => {
          const status = opportunity.status;

          acc[status] = (acc[status] || 0) + 1;
          return acc;
        },
        {}
      );

      return Object.entries(statusCount).map(([status, count]) => ({
        name: status,
        value: count,
      }));
    }
    return [];
  }, [opportunities.isSuccess, opportunities.data]);

  return {
    clients,
    clientsWithOpportunities,
    opportunities,
    opportunitiesByStatus,
  };
}
