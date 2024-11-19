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
    status: string
}

export interface RepoTracking {
    id: number;
    opportunityId: number;
    contactType: string;
    contactDate: string;
    clientContactId: number;
    salesExecutive: string;
    description: string;
}


export async function updateTracking(
    id: number,
    clientData: Omit<RepoTracking, "id">
): Promise<RepoTracking> {
    const response = await axiosClient.patch<RepoTracking>(
        `/monitoring/${id}`,
        clientData
    );
    return response.data;
}

export async function createTracking(clientData: Omit<RepoTracking, "id">): Promise<RepoTracking> {
    const id = getRandomId();
    const response = await axiosClient.post<RepoTracking>("/monitoring", { ...clientData, id });
    return response.data;
}

export async function getTrackingByOpId(opportunityId: number) {
    const response = await axiosClient.get<RepoTracking[]>(
        `/monitoring?opportunityId=${opportunityId}`
    );
    return response.data;
}

export const deleteTracking = async (id: number) => {
    try {
        const response = await axiosClient.delete(`/monitoring/${id}`);

        return response.data;
    } catch (error) {
        console.error("Error deleting tracking", error);
        throw error;
    }
};