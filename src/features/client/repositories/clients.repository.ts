import { axiosClient } from "../../../lib/axios-client";

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

export async function getClients(): Promise<RepoClient[]> {
  const response = await axiosClient.get<RepoClient[]>("/clients");
  return response.data;
}

export async function getClient(id: number): Promise<RepoClient> {
  const response = await axiosClient.get<RepoClient>(`/clients/${id}`);
  return response.data;
}

export async function updateClient(
  id: number,
  clientData: Omit<RepoClient, "id">
): Promise<RepoClient> {
  const response = await axiosClient.patch<RepoClient>(
    `/clients/${id}`,
    clientData
  );
  return response.data;
}