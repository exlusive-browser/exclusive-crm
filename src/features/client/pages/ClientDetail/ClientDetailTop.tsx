import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Typography, Paper, Grid, Divider } from "@mui/material";
import { getClient } from "../../repositories/clients.repository";
import { getContactsByClientId } from "../../repositories/contacts.repository";
import { RepoClientContact } from "../../repositories/contacts.repository";
export function ClientDetail() {
  const { id } = useParams();
  const clientId = id ? Number(id) : undefined;


  const { data: client, isLoading, isError } = useQuery({
    queryKey: ["client", id],
    queryFn: () => (clientId !== undefined ? getClient(clientId) : Promise.reject("Invalid client ID")),
    enabled: !!id,
  });

  const { data: contacts } = useQuery({
    queryKey: ["contacts", clientId],
    queryFn: () => (clientId !== undefined ? getContactsByClientId(clientId) : Promise.reject("Invalid client ID")),
    enabled: !!clientId,
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
        {/* Información del cliente */}
        <Grid item xs={6} sm={2}>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
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

      {/* Divider */}
      <Divider sx={{ marginY: 4 }} />

      {/* Información de contacto */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, color: "primary.dark" }}>
        Contact Information
      </Typography>

      {contacts && contacts.length > 0 ? (
        <Grid container spacing={2}>
          {contacts.map((contact: RepoClientContact) => (
            <Grid item xs={12} sm={6} md={4} key={contact.id}>
              <Paper elevation={1} sx={{ padding: 2, borderRadius: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light" }}>
                  Name:
                </Typography>
                <Typography variant="body2">
                  {contact.firstName} {contact.lastName}
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light", marginTop: 1 }}>
                  Email:
                </Typography>
                <Typography variant="body2">{contact.email}</Typography>

                <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.light", marginTop: 1 }}>
                  Phone:
                </Typography>
                <Typography variant="body2">{contact.phone}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2">No contact information available.</Typography>
      )}
    </Paper>
  );
}
