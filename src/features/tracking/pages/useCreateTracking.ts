import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { CreateTrackingActivityInputSchema } from "../entities/tracking";
import { createTracking, getClientContactsOptionsByClientId, getClientIdByOpId, RepoClientContact } from "../repositories/tracking.repository";
import { ERROR_SNACKBAR_OPTIONS, SUCCESS_SNACKBAR_OPTIONS } from "../../../components/customSnackbar";
import { z } from "zod";
import dayjs from "dayjs";

type FormData = z.infer<typeof CreateTrackingActivityInputSchema>;

function getClientContactsSelectOptions(options: RepoClientContact[]) {
  return options.map((option) => ({
    text: `${option.firstName} ${option.lastName}`,
    value: option.id,
  }));
}

export function useCreateTrackingActivity() {
  const { id } = useParams();
  const opportunityId = id ? Number(id) : undefined;
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(CreateTrackingActivityInputSchema),
    defaultValues: {
      clientContactId: undefined,
      opportunityId: opportunityId || 0,
      contactDate: '',
      salesExecutive: '',
      description: '',
    }
  });

  const { data: clientId } = useQuery({
    queryKey: ['opportunity-client', opportunityId],
    queryFn: () => opportunityId !== undefined ? getClientIdByOpId(opportunityId) : Promise.reject("Invalid opportunity ID"),
    enabled: !!opportunityId,
  });

  const { data: clientContactOptions = [], isLoading: isLoadingClientContacts } = useQuery({
    queryKey: ['clientContact-options'],
    queryFn: () => clientId !== undefined ? getClientContactsOptionsByClientId(clientId) : Promise.reject("Invalid client ID"),
    select: getClientContactsSelectOptions,
    enabled: !!clientId,
  });

  const mutation = useMutation({
    mutationFn: createTracking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trackingActivities'] });
      enqueueSnackbar("Tracking activity created successfully", SUCCESS_SNACKBAR_OPTIONS);
    },
    onError: (error: { message?: string }) => {
      console.error(error);
      enqueueSnackbar("Error: " + (error.message || "Failed to create tracking activity"), ERROR_SNACKBAR_OPTIONS);
    },
  });

  const onSubmit = (data: FormData) => {
    const { contactDate } = data;
    if (!contactDate) {
      enqueueSnackbar("Contact date is required", ERROR_SNACKBAR_OPTIONS);
      return;
    }
    mutation.mutate({
      ...data,
      contactDate: dayjs(contactDate).format("YYYY-MM-DD"),
    });
  };
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    clientContactOptions,
    isLoadingClientContacts,
    setValue,
    watch,
  };
}
