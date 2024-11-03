import { axiosClient } from '../../../lib/axios-client';

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

export async function getClient(id: number): Promise<RepoClient> {
    const response = await axiosClient.get<RepoClient>(`/clients/${id}`);
    return response.data;
}