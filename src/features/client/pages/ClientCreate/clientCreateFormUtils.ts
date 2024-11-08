import { ClientData, ClientContactData } from './ClientCreateForm';
import { createClientContact } from '../../repositories/contacts.repository';
import { createClient } from '../../repositories/clients.repository';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from "notistack";
import { SUCCESS_SNACKBAR_OPTIONS, ERROR_SNACKBAR_OPTIONS } from "../../../../components/customSnackbar";

const phoneRegex = /^(?:\+(\d{1,4})\s)?(\d{1,5})[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$|^\d{10}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validatePhone = (phone: string) => phoneRegex.test(phone);
const validateEmail = (email: string) => emailRegex.test(email);

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

// Handle Contact
export const handleAddContact = (contacts: ClientContactData[], setContacts: React.Dispatch<React.SetStateAction<ClientContactData[]>>) => {
  setContacts([...contacts, { firstName: '', lastName: '', email: '', phone: '' }]);
};

export const handleRemoveContact = (
  contacts: ClientContactData[],
  setContacts: React.Dispatch<React.SetStateAction<ClientContactData[]>>,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>,
  index: number
) => {
  // Remove the contact at the specified index
  const updatedContacts = contacts.filter((_, i) => i !== index);
  setContacts(updatedContacts);

  // Remove the errors associated with the removed contact
  setErrors((prevErrors) => {
    const updatedContactPhones = prevErrors.contactPhones.filter((_, i) => i !== index);
    const updatedContactEmails = prevErrors.contactEmails.filter((_, i) => i !== index);
    
    return {
      ...prevErrors,
      contactPhones: updatedContactPhones,
      contactEmails: updatedContactEmails,
    };
  });
};


// Handle Phone and Email Validation
export const handleClientPhoneChange = (
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>, 
  phone: string
) => {
  handleClientDataChange(setClientData, 'phone', phone);
  setErrors((prev) => ({
    ...prev,
    clientPhone: validatePhone(phone) ? '' : 'Please enter a valid phone number',
  }));
};

export const handleClientEmailChange = (
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>, 
  email: string
) => {
  handleClientDataChange(setClientData, 'corporateEmail', email);
  setErrors((prev) => ({
    ...prev,
    clientEmail: validateEmail(email) ? '' : 'Please enter a valid email address',
  }));
};

export const handleContactPhoneChange = (
  contacts: ClientContactData[],
  setContacts: React.Dispatch<React.SetStateAction<ClientContactData[]>>,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>, 
  index: number,
  phone: string
) => {
  handleContactChange(contacts, setContacts, index, 'phone', phone);
  setErrors((prev) => {
    const contactPhones = [...prev.contactPhones];
    contactPhones[index] = validatePhone(phone) ? '' : 'Please enter a valid phone number';
    return { ...prev, contactPhones };
  });
};

export const handleContactEmailChange = (
  contacts: ClientContactData[],
  setContacts: React.Dispatch<React.SetStateAction<ClientContactData[]>>,
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>, 
  index: number,
  email: string
) => {
  handleContactChange(contacts, setContacts, index, 'email', email);
  setErrors((prev) => {
    const contactEmails = [...prev.contactEmails];
    contactEmails[index] = validateEmail(email) ? '' : 'Please enter a valid email address';
    return { ...prev, contactEmails };
  });
};

interface FormErrors {
  clientPhone: string;
  clientEmail: string;
  contactPhones: string[];
  contactEmails: string[];
}

export const isFormValid = (
  clientData: ClientData,
  contacts: ClientContactData[],
  errors: FormErrors,
  isMutationLoading: boolean
) => {
  const isClientDataIncomplete = Object.values(clientData).some(value => value === '');
  const isContactDataIncomplete = contacts.some(contact => Object.values(contact).some(value => value === ''));
  return (
    !isClientDataIncomplete &&
    !isContactDataIncomplete &&
    !errors.clientPhone &&
    !errors.clientEmail &&
    !errors.contactPhones.some((error: string) => error) &&
    !errors.contactEmails.some((error: string) => error) &&
    !isMutationLoading
  );
};

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
