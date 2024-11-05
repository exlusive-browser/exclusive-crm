import { ClientData, ClientContactData } from './ClientCreateForm';
import { createClientContact } from '../../repositories/contacts.repository';
import { createClient } from '../../repositories/clients.repository';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from "notistack";
import { SUCCESS_SNACKBAR_OPTIONS, ERROR_SNACKBAR_OPTIONS } from "../../../../components/customSnackbar";

// Handle client and contact data change
export const handleClientDataChange = (setClientData: React.Dispatch<React.SetStateAction<ClientData>>, field: keyof ClientData, value: string | boolean) => {
  setClientData(prev => ({ ...prev, [field]: value }));
};

export const handleContactChange = (contacts: ClientContactData[], setContacts: React.Dispatch<React.SetStateAction<ClientContactData[]>>, index: number, field: keyof ClientContactData, value: string) => {
  const updatedContacts = contacts.map((contact, i) =>
    i === index ? { ...contact, [field]: value } : contact
  );
  setContacts(updatedContacts);
};
// --------------------

// Handle Contact
export const handleAddContact = (contacts: ClientContactData[], setContacts: React.Dispatch<React.SetStateAction<ClientContactData[]>>) => {
  setContacts([...contacts, { firstName: '', lastName: '', email: '', phone: '' }]);
};

export const handleRemoveContact = (contacts: ClientContactData[], setContacts: React.Dispatch<React.SetStateAction<ClientContactData[]>>, index: number) => {
  setContacts(contacts.filter((_, i) => i !== index));
};
// --------------------

// Mutation for creating a client
export const useClientCreateMutation = (contacts: ClientContactData[]) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: createClient,
    onSuccess: async (createdClient) => {
      enqueueSnackbar("Client was created successfully", SUCCESS_SNACKBAR_OPTIONS);

      const saveContactsPromises = contacts.map(contact =>
        createClientContact({ ...contact, clientId: createdClient.id })
      );

      await Promise.all(saveContactsPromises);

      queryClient.invalidateQueries({ queryKey: ['createClient'] });
    },
    onError: () => {
      enqueueSnackbar("Something went wrong, try again later", ERROR_SNACKBAR_OPTIONS);
    },
  });
};

export const handleSubmit = (clientData: ClientData, clientMutation: ReturnType<typeof useClientCreateMutation>) => {
  clientMutation.mutate(clientData);
};
