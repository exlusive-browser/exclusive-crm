import { axiosClient } from "../../../lib/axios-client";
import { getRandomId } from "../../../lib/helpers";

export interface RepoTracking {
    id: number;
    opportunityId: number;
    contactType: string;
    contactDate: string;
    clientContactId: string;
    salesExecutive: number;
    description: string;
}

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

export interface OpportunityOption {
    id: number;
    name: string;
}

export function fromRepoOpToClientOption(
    repoOpportunity: RepoOpportunity
): OpportunityOption {
    return {
        id: repoOpportunity.id,
        name: repoOpportunity.businessName,
    };
}

export async function getTracking(): Promise<RepoTracking[]> {
    const response = await axiosClient.get<RepoTracking[]>("/monitoring");
    return response.data;
}

export async function getOpportunityOptions(): Promise<OpportunityOption[]> {
    const response = await axiosClient.get<RepoOpportunity[]>("/opportunities");
    return response.data.map(fromRepoOpToClientOption);
}

// (“Open”, “Under Study”, “Purchase Order”, “Executed”)
export async function createTracking(
    data: Omit<RepoTracking, "id" | "status">
) {
    const id = getRandomId();
    await axiosClient.post("/monitoring", { ...data, id, status: "Open" });
}


export const deleteTracking = async (id: number) => {
    try {
        const response = await axiosClient.delete(`/monitoring/${id}`);

        return response.data;
    } catch (error) {
        console.error("Error deleting tracking: ", error);
        throw error;
    }
};

export const getTrackingById = async (id: number): Promise<RepoTracking> => {
    const response = await axiosClient.get<RepoTracking>(`/monitoring/${id}`);
    return response.data;
}