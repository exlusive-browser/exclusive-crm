import { axiosClient } from "../../../lib/axios-client";

export interface RepoClientContact {
  id: number;
  clientId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export async function createClientContact(contactData: Omit<RepoClientContact, "id">): Promise<RepoClientContact> {
  const response = await axiosClient.post<RepoClientContact>("/contacts", contactData);
  return response.data;
}

export async function getContacts(): Promise<RepoClientContact[]> {
  const response = await axiosClient.get<RepoClientContact[]>("/contacts");
  return response.data;
}

export async function getContact(id: number): Promise<RepoClientContact> {
  const response = await axiosClient.get<RepoClientContact>(`/contacts/${id}`);
  return response.data;
}

