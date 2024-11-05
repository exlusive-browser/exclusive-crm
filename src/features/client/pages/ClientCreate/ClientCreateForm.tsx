import { Box, TextField, Button, Container, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { PrimaryLinkButton } from "../../../../components/buttons";
import AddIcon from '@mui/icons-material/PersonAdd';
import RemoveIcon from '@mui/icons-material/PersonRemove';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ClientCreateFormProps {
  contacts: Contact[];
  onAddContact: () => void;
  onRemoveContact: (index: number) => void;
  onChangeContact: (index: number, field: keyof Contact, value: string) => void; // Change here
}

export function ClientCreateForm({ contacts, onAddContact, onRemoveContact, onChangeContact }: ClientCreateFormProps) {
  return (
    <Container
      sx={{
        backgroundColor: 'white',
        padding: { xs: "0 20px", sm: 4 },
        borderRadius: { xs: "none", sm: 2 },
        boxShadow: { xs: 'none', sm: 3 },
        width: { xs: '100%', sm: '700px' },
        maxHeight: { xs: '100%', sm: '90vh' },
        overflowY: 'auto',
      }}
    >
      <PrimaryLinkButton
        variant="outlined"
        sx={{
          px: 2,
          marginBottom: 2,
          marginTop: { xs: 3, sm: 0 },
        }}
        navigateTo="/clients"
      >
        Back
      </PrimaryLinkButton>

      <Typography variant="h4" gutterBottom
        sx={{
          fontFamily: "titleFontFamily",
          fontWeight: "medium",
        }}>
        Create Client
      </Typography>

      {/* Client Data Fields */}
      <TextField fullWidth label="NIT" variant="outlined" margin="normal" />
      <TextField fullWidth label="Name" variant="outlined" margin="normal" />
      <TextField fullWidth label="Address" variant="outlined" margin="normal" />
      <TextField fullWidth label="City" variant="outlined" margin="normal" />
      <TextField fullWidth label="Country" variant="outlined" margin="normal" />
      <TextField fullWidth label="Phone" variant="outlined" margin="normal" />
      <TextField fullWidth label="Corporate Email" variant="outlined" margin="normal" />

      <FormControlLabel
        control={<Checkbox />}
        label="Is Active"
        sx={{ margin: '12px 0 16px' }}
      />

      <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
        Contact(s)
      </Typography>

      {/* Render Contact list */}
      {contacts.map((contact, index) => (
        <Box
          key={index}
          sx={{
            border: '2px solid gray',
            borderColor: "primary.light",
            padding: 2,
            marginBottom: 2,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={contact.firstName}
                onChange={(e) => onChangeContact(index, 'firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={contact.lastName}
                onChange={(e) => onChangeContact(index, 'lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={contact.email}
                onChange={(e) => onChangeContact(index, 'email', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                value={contact.phone}
                onChange={(e) => onChangeContact(index, 'phone', e.target.value)}
              />
            </Grid>
          </Grid>
          {contacts.length > 1 && (
            <Button
              variant="outlined"
              sx={{
                marginTop: 2,
                color: "red",
                borderColor: "#ff9494",
                justifyContent: 'center',
                width: '100%',
                '&:hover': {
                  borderColor: 'red',
                  backgroundColor: '#fffafa',
                },
              }}
              onClick={() => onRemoveContact(index)}
              startIcon={<RemoveIcon />}
            >
              Remove
            </Button>
          )}
        </Box>
      ))}

      <Button
        variant="outlined"
        sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}
        onClick={onAddContact}
      >
        <AddIcon sx={{ marginRight: "5px", maxWidth: "22px" }} />
        Add Contact
      </Button>

      <PrimaryLinkButton
        fullWidth
        sx={{
          px: 2,
          marginTop: 5,
          marginBottom: { xs: 3, sm: 0 },
        }}
        navigateTo="/clients"
      >
        Create
      </PrimaryLinkButton>
    </Container>
  );
}
