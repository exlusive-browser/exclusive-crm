import { Grid, MenuItem, TextField, Typography, Button, FormHelperText, FormControl, Box } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useCreateTrackingActivity } from "./useCreateTracking";
import { contactTypeOptions } from './form-options';
import dayjs from 'dayjs';

export function TrackingCreateCard() {
  const {
    register,
    handleSubmit,
    errors,
    clientContactOptions,
    isLoadingClientContacts,
    setValue,
    watch,
  } = useCreateTrackingActivity();

  const contactDate = watch("contactDate");


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Contact Type"
                fullWidth
                {...register("contactType", { required: "Contact type is required" })}
                error={!!errors.contactType}
                helperText={errors.contactType?.message?.toString()}
                defaultValue=""
              >
                {contactTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.contactDate}>
                <DateField
                  label="Contact Date"
                  margin="dense"
                  value={contactDate ? dayjs(contactDate) : null}
                  onChange={(date) => setValue("contactDate", date ? date.format("YYYY-MM-DD") : '', { shouldValidate: true })}
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
                {errors.contactDate && (
                  <FormHelperText>{errors.contactDate.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {isLoadingClientContacts ? (
                <Typography>Loading client contacts...</Typography>
              ) : (
                <TextField
                  select
                  label="Client Contact"
                  fullWidth
                  {...register("clientContactId", { required: "Client contact is required" })}
                  error={!!errors.clientContactId}
                  helperText={errors.clientContactId?.message?.toString()}
                  defaultValue=""
                >
                  {clientContactOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.text}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Sales Executive"
                {...register("salesExecutive", { required: "Sales executive is required" })}
                fullWidth
                error={!!errors.salesExecutive}
                helperText={errors.salesExecutive?.message?.toString()}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                {...register("description", { required: "Description is required" })}
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message?.toString()}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </LocalizationProvider>
  );

}
