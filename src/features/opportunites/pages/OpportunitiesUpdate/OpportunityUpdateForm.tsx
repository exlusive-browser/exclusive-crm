import { useUpdateOpportunity } from "./useUpdateOp.ts";
import {
  LinearProgress,
  Box,
  Typography,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { TextField } from "../../../../components/TextField";
import { PrimaryButton } from "../../../../components/buttons";
interface OpportunityUpdateFormProps {
  id: number;
}

export function OpportunityUpdateForm({ id }: OpportunityUpdateFormProps) {
  const {
    isLoading,
    isError,
    isMutationLoading,
    Data,
    register,
    finalOnSubmit: handleSubmit,
    errors,
  } = useUpdateOpportunity({ id });

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
            name="businessName"
            label="businessName"
            margin="dense"
            defaultValue={Data.businessName}
            inputProps={{
              ...register("businessName"),
            }}
            error={!!errors.businessName}
            helperText={errors.businessName?.message}
          />

          <TextField
            name="businessType"
            label="businessType"
            margin="dense"
            defaultValue={Data.businessType}
            inputProps={{
              ...register("businessType"),
            }}
            error={!!errors.businessType}
            helperText={errors.businessType?.message}
          />
          <TextField
            name="estimatedValue"
            label="estimatedValue"
            margin="dense"
            defaultValue={Data.estimatedValue}
            inputProps={{
              ...register("estimatedValue"),
            }}
            error={!!errors.estimatedValue}
            helperText={errors.estimatedValue?.message}
          />
          <TextField
            name="description"
            label="description"
            margin="dense"
            defaultValue={Data.description}
            inputProps={{
              ...register("description"),
            }}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <TextField
            name="estimatedStartDate"
            label="estimatedStartDate"
            margin="dense"
            defaultValue={Data.estimatedStartDate}
            inputProps={{
              ...register("estimatedStartDate"),
            }}
            error={!!errors.estimatedStartDate}
            helperText={errors.estimatedStartDate?.message}
          />

          <FormControl fullWidth margin="dense" error={!!errors.status}>
            <InputLabel>Status</InputLabel>
            <Select
              // name="status"
              label="Status"
              defaultValue={Data.status}
              {...register("status")}
            >
              <MenuItem value="Resource Outsourcing">
                Resource Outsourcing
              </MenuItem>
              <MenuItem value="Pending">Web Development</MenuItem>
              <MenuItem value="In Negotiation">Mobile Development</MenuItem>
              <MenuItem value="Closed">IT Consulting</MenuItem>
              <MenuItem value="Approved">IT Services</MenuItem>
            </Select>
            {errors.status && (
              <Typography variant="caption" color="error">
                {errors.status.message}
              </Typography>
            )}
          </FormControl>

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
