import { Box, TextField, Button, Container, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { PrimaryLinkButton } from "../../../../components/buttons";
import AddIcon from '@mui/icons-material/PersonAdd';
import RemoveIcon from '@mui/icons-material/PersonRemove';
import BackIcon from '@mui/icons-material/ChevronLeft';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '../../repositories/clients.repository';
import { useSnackbar } from "notistack";
import { ERROR_SNACKBAR_OPTIONS, SUCCESS_SNACKBAR_OPTIONS } from "../../../../components/customSnackbar";
import { createClientContact } from '../../repositories/contact.repository';

interface ClientContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ClientData {
  nit: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  corporateEmail: string;
  active: boolean;
}

export function ClientCreateForm() {
  const [clientData, setClientData] = useState<ClientData>({
    nit: '',
    name: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    corporateEmail: '',
    active: false,
  });

  // Contact management
  const [contacts, setContacts] = useState<ClientContact[]>([]);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const clientMutation = useMutation({
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

  const isMutationLoading = clientMutation.status === 'pending';

  // Event Handlers
  const handleChange = (field: keyof ClientData, value: string | boolean) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (index: number, field: keyof ClientContact, value: string) => {
    const updatedContacts = contacts.map((contact, i) =>
      i === index ? { ...contact, [field]: value } : contact
    );
    setContacts(updatedContacts);
  };

  const handleAddContact = () => {
    setContacts([...contacts, { firstName: '', lastName: '', email: '', phone: '' }]);
  };

  const handleRemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    clientMutation.mutate(clientData);
  };

  return (
    <Container
      sx={{
        backgroundColor: 'white',
        padding: { xs: '0 20px', sm: 4 },
        boxShadow: { xs: 'none', sm: 3 },
        width: { xs: '100%', sm: '700px' },
        maxHeight: '100%',
      }}
    >
      <PrimaryLinkButton
        variant="outlined"
        sx={{ px: 2, mb: 2, mt: { xs: 3, sm: 0 } }}
        startIcon={<BackIcon sx={{ maxWidth: '22px' }} />}
        navigateTo="/clients"
      >
        Go Back
      </PrimaryLinkButton>

      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'titleFontFamily', fontWeight: 'medium' }}>
        Create Client
      </Typography>

      {/* Client Data Fields */}
      <TextField fullWidth label="NIT" variant="outlined" margin="normal" value={clientData.nit} onChange={(e) => handleChange('nit', e.target.value)} />
      <TextField fullWidth label="Name" variant="outlined" margin="normal" value={clientData.name} onChange={(e) => handleChange('name', e.target.value)} />
      <TextField fullWidth label="Address" variant="outlined" margin="normal" value={clientData.address} onChange={(e) => handleChange('address', e.target.value)} />
      <TextField fullWidth label="City" variant="outlined" margin="normal" value={clientData.city} onChange={(e) => handleChange('city', e.target.value)} />
      <TextField fullWidth label="Country" variant="outlined" margin="normal" value={clientData.country} onChange={(e) => handleChange('country', e.target.value)} />
      <TextField fullWidth label="Phone" variant="outlined" margin="normal" value={clientData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
      <TextField fullWidth label="Corporate Email" variant="outlined" margin="normal" value={clientData.corporateEmail} onChange={(e) => handleChange('corporateEmail', e.target.value)} />

      <FormControlLabel
        control={<Checkbox checked={clientData.active} onChange={(e) => handleChange('active', e.target.checked)} />}
        label="Is Active"
        sx={{ margin: '12px 0 16px' }}
      />

      <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
        Contact(s)
      </Typography>

      {/* Render Contact list */}
      {contacts.map((contact, index) => (
        <Box key={index} sx={{ border: '2px solid gray', borderColor: 'primary.light', padding: 2, mb: 2, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="First Name" variant="outlined" value={contact.firstName} onChange={(e) => handleContactChange(index, 'firstName', e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Last Name" variant="outlined" value={contact.lastName} onChange={(e) => handleContactChange(index, 'lastName', e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Email" variant="outlined" value={contact.email} onChange={(e) => handleContactChange(index, 'email', e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Phone" variant="outlined" value={contact.phone} onChange={(e) => handleContactChange(index, 'phone', e.target.value)} />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              color: 'red',
              borderColor: '#ff9494',
              width: '100%',

              '&:hover': {
                borderColor: 'red',
                backgroundColor: '#fffafa',
              },
            }}
            onClick={() => handleRemoveContact(index)}
            startIcon={<RemoveIcon />}
          >
            Remove
          </Button>
        </Box>
      ))}

      <Button variant="outlined" sx={{ mb: 2 }} onClick={handleAddContact}>
        <AddIcon sx={{ mr: '5px', maxWidth: '22px' }} />
        Add Contact
      </Button>

      {/* Create Client Button */}
      <Button
        fullWidth
        sx={{
          px: 2,
          mt: 5,
          backgroundColor: isMutationLoading ? "lightgray" : "primary.light",
          color: isMutationLoading ? "black" : "white",

          '&:hover': {
            backgroundColor: isMutationLoading ? "lightgray" : "primary.dark",
          },
        }}
        onClick={handleSubmit}
        disabled={isMutationLoading}
      >
        {isMutationLoading ? 'Creating...' : 'Create'}
      </Button>

      {clientMutation.isError && (
        <Typography variant="body1" textAlign="center" sx={{ p: 2, color: 'error.main' }}>
          Oops, something went wrong. Please try again.
        </Typography>
      )}
    </Container>
  );
}
