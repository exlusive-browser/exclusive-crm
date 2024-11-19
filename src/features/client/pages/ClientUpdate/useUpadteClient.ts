import { getClient, updateClient } from "../../repositories/clients.repository";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getContactsByClientId } from "../../repositories/contacts.repository";
import { createClientContact } from "../../repositories/contacts.repository";
import {
  ERROR_SNACKBAR_OPTIONS,
  SUCCESS_SNACKBAR_OPTIONS,
} from "../../../../components/customSnackbar";
import { ClientUpadteunityInput } from "../../entities/client";
import { CombinedInput, CombinedSchema } from "../../entities/clientContacts";

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

  const { data: contactsData } = useQuery({
    queryKey: ["contacts", id],
    queryFn: () =>
      id !== undefined
        ? getContactsByClientId(id)
        : Promise.reject("Invalid client ID"),
    enabled: !!id,
  });

  const [contacts, setContacts] = useState(contactsData || []);

  useEffect(() => {
    if (contactsData) {
      setContacts(contactsData);
    }
  }, [contactsData]);

  const handleAddContact = async () => {
    setContacts([
      ...contacts,
      await createClientContact({
        clientId: id,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      }),
    ]);
  };

  const deleteContactById = (contactId: number) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact: any) => contact.id !== contactId)
    );
    enqueueSnackbar("Contact removed successfully.", { variant: "success" });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (Data: ClientUpadteunityInput) => updateClient(id, Data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateClient"] });

      enqueueSnackbar(
        "Client was updated successfully",
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
  } = useForm<CombinedInput>({
    resolver: zodResolver(CombinedSchema),
  });

  const onSubmit: SubmitHandler<ClientUpadteunityInput> = async (formData) => {
    const dataToUpdate = {
      ...formData,
      active: Data?.active ?? true,
    };

    mutation.mutate(dataToUpdate);
  };

  const finalOnSubmit = handleSubmit(onSubmit);

  return {
    isLoading,
    isError,
    Data,
    isMutationLoading,
    contacts,
    register,
    finalOnSubmit,
    handleAddContact,
    deleteContactById,
    errors,
  };
}
