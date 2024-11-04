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

export async function getClients(): Promise<RepoClient[]> {
    const response = await axiosClient.get<RepoClient[]>('/clients');
    return response.data;
}