import { getClient, updateClient } from "../../repositories/clients.repository";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import {
  ERROR_SNACKBAR_OPTIONS,
  SUCCESS_SNACKBAR_OPTIONS,
} from "../../../../components/customSnackbar";
import {
  ClientUpadteunityInput,
  ClientUpadteunityInputSchema,
} from "../../entities/client";

interface useUpdateClientProps {
  id: number;
}

export function useUpdateClient({ id }: useUpdateClientProps) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    isLoading,
    isError,
    data: Data,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getClient(id),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (Data: ClientUpadteunityInput) => updateClient(id, Data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });

      enqueueSnackbar(
        "Client is updated successfully",
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientUpadteunityInput>({
    resolver: zodResolver(ClientUpadteunityInputSchema),
  });

  const onSubmit: SubmitHandler<ClientUpadteunityInput> = async (Data) => {
    mutation.mutate({
      ...Data,
    });
  };

  const finalOnSubmit = handleSubmit(onSubmit);

  return { isLoading, isError, Data, register, finalOnSubmit, errors };
}
