import {
  LinearProgress,
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
} from "@mui/material";
import { TextField } from "../../../../components/TextField";
import { PrimaryButton, SecondaryButton } from "../../../../components/buttons";
import { useUpdateClient } from "./useUpadteClient.ts";
import { RepoClientContact } from "../../repositories/contacts.repository";
import { green } from "@mui/material/colors";
interface ClientUpdateFormProps {
  id: number;
}

export function ClientUpdateForm({ id }: ClientUpdateFormProps) {
  const {
    isLoading,
    isError,
    isMutationLoading,
    Data,
    contacts,
    register,
    deleteContactById,
    handleAddContact,
    finalOnSubmit: handleSubmit,
    errors,
  } = useUpdateClient({ id });

  if (isLoading) {
    return (
      <Stack sx={{ width: "100%", mt: 4 }}>
        <LinearProgress />
        <Typography variant="body1" textAlign="center" p={2}>
          Loading Data...
        </Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Typography
        variant="body1"
        textAlign="center"
        sx={{ p: 2, color: "error.main" }}
      >
        Oops, something went wrong. We couldn't load the Data.
      </Typography>
    );
  }

  if (!Data) {
    return (
      <Typography
        variant="body1"
        textAlign="center"
        sx={{ p: 2, color: "error.main" }}
      >
        No Data available.
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "background.paper", p: 2 }}
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            name="nit"
            label="NIT"
            margin="dense"
            defaultValue={Data.nit}
            inputProps={{
              ...register("nit"),
            }}
            error={!!errors.nit}
            helperText={errors.nit?.message}
          />
          <TextField
            name="name"
            label="Name"
            margin="dense"
            defaultValue={Data.name}
            inputProps={{
              ...register("name"),
            }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            name="address"
            label="Address"
            margin="dense"
            defaultValue={Data.address}
            inputProps={{
              ...register("address"),
            }}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            name="city"
            label="City"
            margin="dense"
            defaultValue={Data.city}
            inputProps={{
              ...register("city"),
            }}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            name="country"
            label="Country"
            margin="dense"
            defaultValue={Data.country}
            inputProps={{
              ...register("country"),
            }}
            error={!!errors.country}
            helperText={errors.country?.message}
          />
          <TextField
            name="phone"
            label="Phone"
            margin="dense"
            defaultValue={Data.phone}
            inputProps={{
              ...register("phone"),
            }}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            name="corporateEmail"
            label="Corporate Email"
            margin="dense"
            defaultValue={Data.corporateEmail}
            inputProps={{
              ...register("corporateEmail"),
            }}
            error={!!errors.corporateEmail}
            helperText={errors.corporateEmail?.message}
          />
          {contacts && contacts.length > 0 ? (
            <Grid container spacing={3}>
              {contacts.map((contact: RepoClientContact) => (
                <Grid item xs={12} sm={6} md={4} key={contact.id}>
                  <Paper elevation={1} sx={{ padding: 2, borderRadius: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "primary.light" }}
                    >
                      Name:
                    </Typography>
                    <Typography variant="body2">
                      {contact.firstName} {contact.lastName}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "primary.light",
                        marginTop: 1,
                      }}
                    >
                      Email:
                    </Typography>
                    <Typography variant="body2">{contact.email}</Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "primary.light",
                        marginTop: 1,
                      }}
                    >
                      Phone:
                    </Typography>
                    <Typography variant="body2">{contact.phone}</Typography>
                    <Typography variant="body2">{contact.id}</Typography>
                    <SecondaryButton
                      onClick={() => deleteContactById(contact.id)}
                    >
                      Remove
                    </SecondaryButton>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2">
              No contact information available.
            </Typography>
          )}{" "}
          <SecondaryButton
            sx={{ backgroundColor: green[500], color: "white", padding: 1 }}
            onClick={handleAddContact}
          >
            Add Contact
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={isMutationLoading}
          >
            {isMutationLoading ? "Submitting..." : "Submit"}
          </PrimaryButton>
        </Grid>
      </Box>
    </>
  );
}
