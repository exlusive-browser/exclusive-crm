import { LinearProgress, Box, Typography, Stack } from "@mui/material";
import { TextField } from "../../../../components/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import { PrimaryButton } from "../../../../components/buttons";
import { useUpdateClient } from "./useUpadteClient.ts";

interface ClientUpdateFormProps {
  id: number;
}

export function ClientUpdateForm({ id }: ClientUpdateFormProps) {
  const {
    isLoading,
    isError,
    isMutationLoading,
    Data,
    register,
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
      <Box sx={{ height: 600, width: "100%" }}>
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
