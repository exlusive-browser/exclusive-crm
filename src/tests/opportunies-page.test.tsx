import { render, screen } from "@testing-library/react";
import { OpportuniesListPage } from "../features/opportunites/pages/OpportuniesList/OpportuniesListPage";
import { RepoOpportunity } from "../features/client/repositories/clients.repository";
import { ProviderWrapper } from "./test-provider";
import { useOpportunities } from "../features/opportunites/hooks/useOpportunities";

jest.mock("../features/opportunites/hooks/useOpportunities");
jest.mock("../config", () => ({
  API_URL: "",
}));

const mockOpportunities: RepoOpportunity[] = [
  {
    id: 6452161,
    clientId: 8754741,
    businessName: "Cloud Migration Project",
    businessType: "IT Services",
    description: "Migration of on-premises infrastructure to cloud solutions.",
    estimatedValue: 75000000,
    estimatedStartDate: "2024-01-15",
    status: "Pending",
  },
  {
    id: 2974156,
    clientId: 215635,
    businessName: "E-commerce Platform Expansion",
    businessType: "Retail",
    description: "Expansion of online retail platform to new markets.",
    estimatedValue: 150000000,
    estimatedStartDate: "2024-03-10",
    status: "In Negotiation",
  },
  {
    id: 948513,
    clientId: 494139,
    businessName: "Sustainability Audit X",
    businessType: "Consulting",
    description:
      "Environmental impact assessment for compliance with sustainability regulations.",
    estimatedValue: 5000000,
    estimatedStartDate: "2024-02-20",
    status: "Approved",
  },
];

const mockedUseOpportunities = jest.mocked(useOpportunities, { shallow: true });

describe("Testing opportunities page", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("should render 3 elements", async () => {
    mockedUseOpportunities.mockImplementation(() => ({
      isPending: false,
      isError: false,
      data: mockOpportunities,
    }));

    const { container } = render(<OpportuniesListPage />, {
      wrapper: ProviderWrapper,
    });

    const row0 = container.querySelector('[data-id="6452161"]');
    expect(row0).toBeInTheDocument();
    expect(row0?.getAttribute("data-rowindex")).toBe("0");

    const row1 = container.querySelector('[data-id="2974156"]');
    expect(row1).toBeInTheDocument();
    expect(row1?.getAttribute("data-rowindex")).toBe("1");

    const row2 = container.querySelector('[data-id="948513"]');
    expect(row2).toBeInTheDocument();
    expect(row2?.getAttribute("data-rowindex")).toBe("2");
  });

  it("should show an error message if data could not be fetch", async () => {
    mockedUseOpportunities.mockImplementation(() => ({
      isPending: false,
      isError: true,
      data: [],
    }));

    render(<OpportuniesListPage />, {
      wrapper: ProviderWrapper,
    });

    const errorMessage = await screen.findByText(/Oops, something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
