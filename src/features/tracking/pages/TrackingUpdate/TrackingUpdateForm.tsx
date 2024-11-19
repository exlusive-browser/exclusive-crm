import { useUpdateTracking } from "./updateTrackingUtils";
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

interface TrackingUpdateFormProps {
    id: number;
    opportunityId: number;
}

export function TrackingUpdateForm({ id, opportunityId }: TrackingUpdateFormProps) {
    const {
        isLoading,
        isError,
        isMutationLoading,
        clientContactOptions,
        isLoadingClientContacts,
        Data,
        register,
        finalOnSubmit: handleSubmit,
        errors,
    } = useUpdateTracking({ id, opportunityId  });

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
        <Box sx={{ height: 600, width: "100%" }}>
            <Grid
                container
                spacing={2}
                sx={{ backgroundColor: "background.paper", p: 2 }}
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    name="description"
                    label="Description"
                    margin="dense"
                    defaultValue={Data.description}
                    inputProps={{
                        ...register("description"),
                    }}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />

                {isLoadingClientContacts ? (
                    <Typography>Loading client contacts...</Typography>
                ) : (
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Client Contact</InputLabel>
                        <Select
                            label="Client Contact"
                            defaultValue="" // Valor inicial vacío
                            {...register("clientContactId", {
                                required: "Client contact is required",
                            })}
                            error={!!errors.clientContactId}
                        >
                            {clientContactOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.text}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.clientContactId && (
                            <Typography variant="caption" color="error">
                                {errors.clientContactId.message?.toString()}
                            </Typography>
                        )}
                    </FormControl>
                )}

                <TextField
                    name="salesExecutive"
                    label="Sales Executive"
                    margin="dense"
                    defaultValue={Data.salesExecutive}
                    inputProps={{
                        ...register("salesExecutive"),
                    }}
                    error={!!errors.salesExecutive}
                    helperText={errors.salesExecutive?.message}
                />

                <TextField
                    name="contactDate"
                    label="Contact Date"
                    margin="dense"
                    defaultValue={Data.contactDate}
                    inputProps={{
                        ...register("contactDate"),
                    }}
                    error={!!errors.contactDate}
                    helperText={errors.contactDate?.message}
                />

                <FormControl fullWidth margin="dense" error={!!errors.contactType}>
                    <InputLabel>Contact Type</InputLabel>
                    <Select
                        label="Contact Type"
                        defaultValue={Data.contactType}
                        {...register("contactType")}
                    >
                        <MenuItem value="In-Person Meeting">
                            In-Person Meeting
                        </MenuItem>
                        <MenuItem value="Phone Call">Phone Call</MenuItem>
                        <MenuItem value="Email">Email</MenuItem>
                    </Select>
                    {errors.contactType && (
                        <Typography variant="caption" color="error">
                            {errors.contactType.message}
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
    );
}
