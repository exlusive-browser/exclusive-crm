import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { getOpportunityById } from "../../repositories/opportunites.repository";
import { formatCurrency } from "../../../../lib/helpers";


export function OpportunityDetailTop() {
  const { id } = useParams();
  const opportunityId = id ? Number(id) : undefined;


  const { data: opportunity, isLoading, isError } = useQuery({
    queryKey: ["opportunities", id],
    queryFn: () => (opportunityId !== undefined ? getOpportunityById(opportunityId) : Promise.reject("Invalid opportunity ID")),
    enabled: !!id,
  });


  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error fetching client data.</Typography>;
  }

  if (!opportunity) {
    return <Typography>No client data found.</Typography>;
  }

  return (

    <Box
      sx={{
        padding: 4,
        borderRadius: 3,
        backgroundColor: "background.paper",
        boxShadow: 3,
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} alignItems="baseline" spacing={2} sx={{ marginBottom: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.dark" }}>
          {opportunity.businessName}
        </Typography>
        <Typography variant="h5" sx={{ color: "primary.light" }}>
          {opportunity.businessType}
        </Typography>
      </Stack>

      <Divider sx={{ marginY: 2 }} />

      <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Box
          sx={{
            minWidth: { xs: "80vw", sm: "35vw" },
            flex: 1,
            padding: { xs: 0, sm: 2 },
            marginBottom: { xs: 1, sm: 0 },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
            Description
          </Typography>
          <Typography variant="body2">{opportunity.description}</Typography>
        </Box>

        <Box
          sx={{
            minWidth: "200px",
            flex: 1,
            padding: { xs: 0, sm: 2 },
            marginBottom: { xs: 1, sm: 0 },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
            Estimated Value
          </Typography>
          <Typography variant="body2">{formatCurrency(opportunity.estimatedValue)}</Typography>
        </Box>

        <Box
          sx={{
            minWidth: "200px",
            flex: 1,
            padding: { xs: 0, sm: 2 },
            marginBottom: { xs: 1, sm: 0 },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
            Estimated Start Date
          </Typography>
          <Typography variant="body2">{opportunity.estimatedStartDate}</Typography>
        </Box>

        <Box
          sx={{
            minWidth: "200px",
            flex: 1,
            padding: { xs: 0, sm: 2 },
            marginBottom: { xs: 1, sm: 0 },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
            Status
          </Typography>
          <Typography variant="body2">{opportunity.status}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}
