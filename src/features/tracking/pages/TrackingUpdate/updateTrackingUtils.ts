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
import { RepoTracking, updateTracking } from "../../repositories/tracking.repository";


export const CreateTrackingInputSchema = z.object({
  desctiption: z
    .string()
    .min(1, "Description is required"),
  salesExecutive: z
    .string()
    .min(1, "Description is required"),
  clientContactId: z.coerce
    .number({ message: "Contact ID must be a number" })
    .nonnegative("Contact ID must be positive"),
});

export const UpdateTrackingInputSchema = z.object({
  description: z
    .string()
    .min(1, "Description is required"),
  salesExecutive: z
    .string()
    .min(1, "Sales executive is required"),
  contactDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Contact date must be a valid date",
  }),
  contactType: z.enum(["Phone Call", "Video Call", "Email", "In-Person Meeting"]),
  opportunityId: z.number(),
  clientContactId: z.coerce
    .number({ message: "Contact ID must be a number" })
    .nonnegative("Contact ID must be positive")
    .min(1, "Contact ID is required"),
});

export type CreateTrackingInput = z.infer<
  typeof CreateTrackingInputSchema
>;

export type UpdateTrackingInput = z.infer<
  typeof UpdateTrackingInputSchema
>;

interface useUpdateTrackingProps {
  id: number;
}

export const getTrackingById = async (
  id: number
): Promise<RepoTracking> => {
  const response = await axiosClient.get<RepoTracking>(
    `/monitoring/${id}`
  );
  return response.data;
};

export function useUpdateTracking({ id }: useUpdateTrackingProps) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    isLoading,
    isError,
    data: Data,
  } = useQuery({
    queryKey: ["Tracking", id],
    queryFn: () => getTrackingById(id),
  });


  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (Data: UpdateTrackingInput) => updateTracking(id, Data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateTracking"] });

      enqueueSnackbar(
        "Tracking updated successfully",
        SUCCESS_SNACKBAR_OPTIONS
      );
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar(
        "Sorry, something went wrong, try again later",
        ERROR_SNACKBAR_OPTIONS
      );
    },
  });

  const isMutationLoading = mutation.status === "pending";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTrackingInput>({
    resolver: zodResolver(UpdateTrackingInputSchema),
  });

  const onSubmit: SubmitHandler<UpdateTrackingInput> = async (formData) => {
    const dataToUpdate = {
      ...formData,
    };

    mutation.mutate(dataToUpdate);
  };

  const finalOnSubmit = handleSubmit(onSubmit);
  return {
    Data,
    isLoading,
    isError,
    register,
    errors,
    finalOnSubmit,
    isMutationLoading,
  };
}
