import { axiosClient } from "../../../lib/axios-client";
import { getRandomId } from "../../../lib/helpers";

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

export interface updateClientStatusProps {
  id: number;
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

export async function createClient(clientData: Omit<RepoClient, "id">): Promise<RepoClient> {
  const id = getRandomId(); 
  const response = await axiosClient.post<RepoClient>("/clients", { ...clientData, id });
  return response.data;
}
  
export async function updateClientStatus({ id, isActive }: { id: number, isActive: boolean }): Promise<RepoClient> {
  try {
    const response = await axiosClient.patch<RepoClient>(`/clients/${id}`, {
      active: isActive
    });
    return response.data; // Asume que el servidor devuelve el cliente actualizado
  } catch (error) {
    console.error("Failed to update client status", error);
    throw error;
  }
}
