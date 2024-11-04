import { useState } from 'react';
import { PrimaryLinkButton } from "../../../../components/buttons";
import { Container, TextField, Button, Box, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/PersonAdd';
import RemoveIcon from '@mui/icons-material/PersonRemove';

export function ClienCreatePage() {
  const [contacts, setContacts] = useState([{ firstName: '', lastName: '', email: '', phone: '' }]);

  const handleAddContact = () => {
    setContacts([...contacts, { firstName: '', lastName: '', email: '', phone: '' }]);
  };

  const handleRemoveContact = (index: number) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: { xs: 'transparent', sm: 'primary.light' },
        padding: { xs: 0, sm: 2 },
      }}
    >
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

        {/* Client Data */}
        <TextField
          fullWidth
          label="NIT"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="City"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Country"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Corporate Email"
          variant="outlined"
          margin="normal"
        />

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
                  onChange={(e) => {
                    const newContacts = [...contacts];
                    newContacts[index].firstName = e.target.value;
                    setContacts(newContacts);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={contact.lastName}
                  onChange={(e) => {
                    const newContacts = [...contacts];
                    newContacts[index].lastName = e.target.value;
                    setContacts(newContacts);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={contact.email}
                  onChange={(e) => {
                    const newContacts = [...contacts];
                    newContacts[index].email = e.target.value;
                    setContacts(newContacts);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  variant="outlined"
                  value={contact.phone}
                  onChange={(e) => {
                    const newContacts = [...contacts];
                    newContacts[index].phone = e.target.value;
                    setContacts(newContacts);
                  }}
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
                    borderColor: 'red', // Change to your desired hover border color
                    backgroundColor: '#fffafa', // Change to your desired hover background color
                  },
                }}
                onClick={() => handleRemoveContact(index)}
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
          onClick={handleAddContact}
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
    </Box>
  );
}
