import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
  ERROR_SNACKBAR_OPTIONS,
  SUCCESS_SNACKBAR_OPTIONS,
} from "../../../../components/customSnackbar";

import { z } from "zod";
import { axiosClient } from "../../../../lib/axios-client";
import { getClientContactsOptionsByClientId, getClientIdByOpId, RepoClientContact, RepoTracking, updateTracking } from "../../repositories/tracking.repository";
import { useEffect } from "react";
import { UpdateTrackingActivityInputSchema } from "../../entities/tracking";

export type UpdateTrackingInput = z.infer<typeof UpdateTrackingActivityInputSchema>;

interface useUpdateTrackingProps {
  id: number;
  opportunityId: number;
}

// Función auxiliar para mapear las opciones de `clientContact`
function getClientContactsSelectOptions(options: RepoClientContact[]) {
  return options.map((option) => ({
    text: `${option.firstName} ${option.lastName}`,
    value: option.id,
  }));
}

// Función asíncrona para obtener datos de tracking por ID
export const getTrackingById = async (id: number): Promise<RepoTracking> => {
  const response = await axiosClient.get<RepoTracking>(`/monitoring/${id}`);
  return response.data;
};

export function useUpdateTracking({ id, opportunityId }: useUpdateTrackingProps) {
  // const { ida } = useParams();
  // const opportunityId = ida ? Number(ida) : undefined;
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  // Query para obtener los datos iniciales de tracking
  const { isLoading, isError, data: Data } = useQuery({
    queryKey: ["Tracking", id],
    queryFn: () => getTrackingById(id),
  });

  // Query para obtener `clientId` basado en `opportunityId`
  const { data: clientId } = useQuery({
    queryKey: ['opportunity-client', opportunityId],
    queryFn: () => opportunityId !== undefined ? getClientIdByOpId(opportunityId) : Promise.reject("Invalid opportunity ID"),
    enabled: !!opportunityId,
  });
  
  // Query para obtener `clientContactOptions` usando `clientId`
  const { data: clientContactOptions = [], isLoading: isLoadingClientContacts } = useQuery({
    queryKey: ['clientContact-options', clientId],
    queryFn: () => clientId !== undefined ? getClientContactsOptionsByClientId(clientId) : Promise.reject("Invalid client ID"),
    select: getClientContactsSelectOptions,
    enabled: !!clientId,
  });

  // Mutación para actualizar datos de tracking
  const mutation = useMutation({
    mutationFn: (dataToUpdate: UpdateTrackingInput) => updateTracking(id, dataToUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Tracking", id] });
      enqueueSnackbar("Tracking updated successfully", SUCCESS_SNACKBAR_OPTIONS);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      enqueueSnackbar("Sorry, something went wrong, try again later", ERROR_SNACKBAR_OPTIONS);
    },
  });

  const isMutationLoading = mutation.status === 'pending';

  // Configuración del formulario con validación zod
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTrackingInput>({
    resolver: zodResolver(UpdateTrackingActivityInputSchema),
    defaultValues: {
      description: Data?.description,
      salesExecutive: Data?.salesExecutive,
      clientContactId: Data?.clientContactId,
      contactDate: Data?.contactDate,
      contactType: Data?.contactType,
      opportunityId: opportunityId,
    },
  });

  // Efecto para actualizar el valor de `contactType` cuando `Data` esté disponible
  useEffect(() => {
    if (Data?.contactType) {
      setValue("contactType", Data.contactType);
    }
  }, [Data, setValue]);

  // Función de envío del formulario
  const onSubmit: SubmitHandler<UpdateTrackingInput> = async (formData) => {
    console.log("Data to submit:", formData);
    mutation.mutate(formData);
  };

  const finalOnSubmit = handleSubmit(onSubmit);

  return {
    Data,
    isLoading,
    isError,
    register,
    errors,
    finalOnSubmit,
    clientContactOptions,
    isLoadingClientContacts,
    isMutationLoading,
  };
}
