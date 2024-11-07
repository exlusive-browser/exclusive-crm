import { Box, TextField, Button, Container, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { PrimaryLinkButton } from "../../../../components/buttons";
import AddIcon from '@mui/icons-material/PersonAdd';
import RemoveIcon from '@mui/icons-material/PersonRemove';
import BackIcon from '@mui/icons-material/ChevronLeft';
import { useState } from 'react';
import {
  useClientCreateMutation,
  handleClientDataChange,
  handleContactChange,
  handleAddContact,
  handleRemoveContact,
  handleSubmit
} from './clientCreateFormUtils';

export interface ClientContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ClientData {
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

  const [contacts, setContacts] = useState<ClientContactData[]>([]);

  const clientMutation = useClientCreateMutation(contacts);

  const isMutationLoading = clientMutation.status === 'pending';
  const isClientDataIncomplete = Object.values(clientData).some(value => value === '');
  const isContactDataIncomplete = contacts.some(contact => Object.values(contact).some(value => value === ''));

  const [errors, setErrors] = useState({
    clientPhone: '',
    clientEmail: '',
    contactPhones: Array(contacts.length).fill(''),
    contactEmails: Array(contacts.length).fill(''),
  });

  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 

  const validatePhone = (phone: string) => phoneRegex.test(phone);
  const validateEmail = (email: string) => emailRegex.test(email);

  const handleClientPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    handleClientDataChange(setClientData, 'phone', phone);
    setErrors((prev) => ({
      ...prev,
      clientPhone: validatePhone(phone) ? '' : 'Please enter a valid phone number',
    }));
  };

  const handleClientEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    handleClientDataChange(setClientData, 'corporateEmail', email);
    setErrors((prev) => ({
      ...prev,
      clientEmail: validateEmail(email) ? '' : 'Please enter a valid email address',
    }));
  };

  const handleContactPhoneChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const phone = e.target.value;
    handleContactChange(contacts, setContacts, index, 'phone', phone);
    setErrors((prev) => {
      const contactPhones = [...prev.contactPhones];
      contactPhones[index] = validatePhone(phone) ? '' : 'Please enter a valid phone number';
      return { ...prev, contactPhones };
    });
  };

  const handleContactEmailChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const email = e.target.value;
    handleContactChange(contacts, setContacts, index, 'email', email);
    setErrors((prev) => {
      const contactEmails = [...prev.contactEmails];
      contactEmails[index] = validateEmail(email) ? '' : 'Please enter a valid email address';
      return { ...prev, contactEmails };
    });
  };

  const isFormValid =
    !isClientDataIncomplete &&
    !isContactDataIncomplete &&
    !errors.clientPhone &&
    !errors.clientEmail &&
    !errors.contactPhones.some((error) => error) &&
    !errors.contactEmails.some((error) => error);

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
      <TextField
        fullWidth
        label="NIT"
        
        variant="outlined"
        margin="normal"
        value={clientData.nit}
        onChange={(e) => handleClientDataChange(setClientData, 'nit', e.target.value)}
      />
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        value={clientData.name}
        onChange={(e) => handleClientDataChange(setClientData, 'name', e.target.value)}
      />
      <TextField
        fullWidth
        label="Address"
        variant="outlined"
        margin="normal"
        value={clientData.address}
        onChange={(e) => handleClientDataChange(setClientData, 'address', e.target.value)}
      />
      <TextField
        fullWidth
        label="City"
        variant="outlined"
        margin="normal"
        value={clientData.city}
        onChange={(e) => handleClientDataChange(setClientData, 'city', e.target.value)}
      />
      <TextField
        fullWidth
        label="Country"
        variant="outlined"
        margin="normal"
        value={clientData.country}
        onChange={(e) => handleClientDataChange(setClientData, 'country', e.target.value)}
      />
      <TextField
        fullWidth
        label="Phone"
        variant="outlined"
        margin="normal"
        value={clientData.phone}
        onChange={handleClientPhoneChange}
        error={!!errors.clientPhone}
        helperText={errors.clientPhone}
      />
      <TextField
        fullWidth
        label="Corporate Email"
        variant="outlined"
        margin="normal"
        value={clientData.corporateEmail}
        onChange={handleClientEmailChange}
        error={!!errors.clientEmail}
        helperText={errors.clientEmail}
      />

      <FormControlLabel
        control={<Checkbox checked={clientData.active} onChange={(e) => handleClientDataChange(setClientData, 'active', e.target.checked)} />}
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
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={contact.firstName}
                onChange={(e) => handleContactChange(contacts, setContacts, index, 'firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={contact.lastName}
                onChange={(e) => handleContactChange(contacts, setContacts, index, 'lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={contact.email}
                onChange={(e) => handleContactEmailChange(index, e)}
                error={!!errors.contactEmails[index]}
                helperText={errors.contactEmails[index]}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                value={contact.phone}
                onChange={(e) => handleContactPhoneChange(index, e)}
                error={!!errors.contactPhones[index]}
                helperText={errors.contactPhones[index]}
              />
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
            onClick={() => handleRemoveContact(contacts, setContacts, index)}
            startIcon={<RemoveIcon />}
          >
            Remove
          </Button>
        </Box>
      ))}

      <Button variant="outlined" sx={{ mb: 2 }} onClick={() => handleAddContact(contacts, setContacts)}>
        <AddIcon sx={{ mr: '5px', maxWidth: '22px' }} />
        Add Contact
      </Button>

      {/* Create Client Button and conditions to enable or disable it */}
      <Button
        fullWidth
        sx={{
          px: 2,
          mt: 5,
          mb: { xs: 5, sm: 0 },
          backgroundColor:
            isFormValid && !isMutationLoading ? 'primary.light' : 'lightgray',
          color:
            isFormValid && !isMutationLoading ? 'white' : 'black',
          '&:hover': {
            backgroundColor:
              isFormValid && !isMutationLoading ? 'primary.dark' : 'lightgray',
          },
        }}
        onClick={() => handleSubmit(clientData, clientMutation)}
        disabled={!isFormValid || isMutationLoading}
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

