import {
  getOpportunityById,
  updateOpportunity,
} from "../../repositories/opportunites.repository";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Dayjs } from "dayjs";
import { useState } from "react";
import {
  ERROR_SNACKBAR_OPTIONS,
  SUCCESS_SNACKBAR_OPTIONS,
} from "../../../../components/customSnackbar";
import {
  UpdateOpportunityInput,
  UpdateOpportunityInputSchema,
} from "../../entities/opportunity";

interface useUpdateOpportuntyProps {
  id: number;
}

export function useUpdateOpportunity({ id }: useUpdateOpportuntyProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const {
    isLoading,
    isError,
    data: Data,
  } = useQuery({
    queryKey: ["Opportunities", id],
    queryFn: () => getOpportunityById(id),
  });

  const onStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (Data: UpdateOpportunityInput) => updateOpportunity(id, Data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateOpportunity"] });

      enqueueSnackbar(
        "Opportunity was updated successfully",
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
  } = useForm<UpdateOpportunityInput>({
    resolver: zodResolver(UpdateOpportunityInputSchema),
  });

  const onSubmit: SubmitHandler<UpdateOpportunityInput> = async (formData) => {
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
    startDate,
    finalOnSubmit,
    onStartDateChange,
    isMutationLoading,
  };
}
