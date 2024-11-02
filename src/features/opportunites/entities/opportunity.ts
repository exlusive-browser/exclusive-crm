export interface Opportunity {
  id: number;
  // todo: Add Client type
  businessName: string;
  businessType: string;
  description: string;
  estimatedValue: number;
  estimatedStartDate: string;
  status: string;
}
