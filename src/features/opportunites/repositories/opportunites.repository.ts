import { axiosClient } from "../../../lib/axios-client";

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

export async function getOpportunities(): Promise<RepoOpportunity[]> {
  const response = await axiosClient.get<RepoOpportunity[]>("/opportunities");
  return response.data;
}
