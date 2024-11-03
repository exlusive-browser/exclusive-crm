import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { TextField } from "../../../../components/TextField";
import { Typography } from "@mui/material";
import { businessTypeOptions } from "./form-options";
import { Select } from "../../../../components/Select";
import { DateField } from "@mui/x-date-pickers";
import { PrimaryButton } from "../../../../components/buttons";
import { useCreateOpportunity } from "./useCreateOpportunity";

export function OpportunityCreateCard() {
  const {
    businessType,
    clientId,
    startDate,
    nonFieldError,
    onBusinessTypeChange,
    onClientChange,
    onStartDateChange,
    register,
    errors,
    finalOnSubmit: handleSubmit,
    selectClientOptions,
    isClientOptionsError,
  } = useCreateOpportunity();

  return (
    <Grid
      container
      spacing={2}
      sx={{ backgroundColor: "background.paper", p: 2 }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Grid xs={12} lg={6}>
        <TextField
          name="businessName"
          label="Business Name"
          margin="dense"
          inputProps={{
            ...register("businessName"),
          }}
          error={!!errors.businessName}
          helperText={errors.businessName?.message}
        />
      </Grid>
      <Grid xs={12} lg={6}>
        <Select
          name="businessType"
          label="Business Type"
          items={businessTypeOptions}
          value={businessType}
          onChange={onBusinessTypeChange}
        />
      </Grid>
      <Grid xs={12}>
        <Select
          name="clientId"
          label="Client"
          items={selectClientOptions}
          value={clientId || ""}
          onChange={onClientChange}
          error={isClientOptionsError}
          helperText={
            isClientOptionsError
              ? "Error loading clients, please refresh the page and try again"
              : ""
          }
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          name="description"
          label="Description"
          multiline
          rows={4}
          margin="dense"
          sx={{ m: 0 }}
          inputProps={{
            ...register("description"),
          }}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          name="estimatedValue"
          label="Estimated Value"
          margin="dense"
          inputProps={{
            ...register("estimatedValue"),
          }}
          error={!!errors.estimatedValue}
          helperText={errors.estimatedValue?.message}
        />
      </Grid>
      <Grid xs={6}>
        <DateField
          fullWidth
          label="Estimated Start Date"
          margin="dense"
          value={startDate}
          onChange={onStartDateChange}
          InputLabelProps={{ shrink: true }}
          format="YYYY-MM-DD"
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: (theme) => theme.spacing(2),
            },
            "& .MuiInputBase-input": {
              padding: (theme) => `${theme.spacing(1.5)} ${theme.spacing(3)}`,
              py: 1.5,
            },
            "& .MuiInputLabel-root": {
              top: "3px",
            },
          }}
        />
      </Grid>
      <Grid xs={12}>
        <PrimaryButton type="submit" fullWidth>
          Submit
        </PrimaryButton>
      </Grid>
      <Grid xs={12}>
        {nonFieldError != "" && (
          <Typography
            variant="body2"
            sx={{
              p: 1,
              textAlign: "center",
              color: "error.main",
            }}
          >
            {nonFieldError}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
