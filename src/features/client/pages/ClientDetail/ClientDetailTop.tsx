import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Typography, Paper, Grid } from "@mui/material";
import { getClient } from "../../repositories/clients.repository";

export function ClientDetail() {
  const { id } = useParams();
  const clientId = id ? Number(id) : undefined;


  const { data: client, isLoading, isError } = useQuery({
    queryKey: ["client", id],
    queryFn: () => (clientId !== undefined ? getClient(clientId) : Promise.reject("Invalid client ID")),
    enabled: !!id,
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error fetching client data.</Typography>;
  }

  if (!client) {
    return <Typography>No client data found.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 5, borderRadius: 2, margin: "auto" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3, color: "primary.dark" }}>
        {client.name}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6} sm={2}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light", }}>
            NIT:
          </Typography>
          <Typography variant="body2">{client.nit}</Typography>
        </Grid>

        <Grid item xs={6} sm={2}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
            Address:
          </Typography>
          <Typography variant="body2">{client.address}</Typography>
        </Grid>

        <Grid item xs={6} sm={1.5}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
            City:
          </Typography>
          <Typography variant="body2">{client.city}</Typography>
        </Grid>

        <Grid item xs={6} sm={1.5}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
            Country:
          </Typography>
          <Typography variant="body2">{client.country}</Typography>
        </Grid>

        <Grid item xs={6} sm={2}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
            Phone:
          </Typography>
          <Typography variant="body2">{client.phone}</Typography>
        </Grid>

        <Grid item xs={6} sm={2}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
            Corporate Email:
          </Typography>
          <Typography variant="body2">{client.corporateEmail}</Typography>
        </Grid>

        <Grid item xs={6} md={3} lg={1}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
            Status:
          </Typography>
          <Typography variant="body2" color={client.active ? "primary.dark" : "error"}>
            {client.active ? "Active" : "Inactive"}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

