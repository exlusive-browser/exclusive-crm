import { axiosClient } from "../../../lib/axios-client";
import { getRandomId } from "../../../lib/helpers";

export interface RepoOpportunity {
  id: number;
  clientId: number;
  businessName: string;
  businessType: string;
  description: string;
  estimatedValue: number;
  estimatedStartDate: string;
  status: string;
}

export interface RepoClient {
  id: number;
  nit: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  corporateEmail: string;
  active: boolean;
}

export interface ClientOption {
  id: number;
  name: string;
}

export function fromRepoClientToClientOption(
  repoClient: RepoClient
): ClientOption {
  return {
    id: repoClient.id,
    name: repoClient.name,
  };
}

export async function getOpportunities(): Promise<RepoOpportunity[]> {
  const response = await axiosClient.get<RepoOpportunity[]>("/opportunities");
  return response.data;
}

export async function getClientsOptions(): Promise<ClientOption[]> {
  const response = await axiosClient.get<RepoClient[]>("/clients");
  return response.data.map(fromRepoClientToClientOption);
}

// (“Open”, “Under Study”, “Purchase Order”, “Executed”)
export async function createOpportunity(
  data: Omit<RepoOpportunity, "id" | "status">
) {
  const id = getRandomId();
  await axiosClient.post("/opportunities", { ...data, id, status: "Open" });
}
