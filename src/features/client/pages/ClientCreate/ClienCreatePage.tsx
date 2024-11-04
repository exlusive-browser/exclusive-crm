import React from 'react';
import { PrimaryLinkButton } from "../../../../components/buttons";
import { Container, TextField, Button, Box, Typography, Grid, FormControlLabel, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export function ClienCreatePage() {

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'primary.light',
      }}
    >
      <Container
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '500px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >

        <PrimaryLinkButton
          variant="outlined"
          sx={{ px: 2, marginBottom: 2 }}
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
          label="Is Active?"
          sx={{ margin: '12px 0 16px' }}
        />

        <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
          Contact(s)
        </Typography>

        {/* Contact data */}
        <Box
          sx={{
            border: '1px solid gray',
            padding: 2,
            marginBottom: 2,
            borderRadius: 2,
          }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>

        <Button variant="outlined" sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
          <AddIcon sx={{ marginRight: "5px" }} />
          Add Contact
        </Button>

        <PrimaryLinkButton
          fullWidth
          sx={{ px: 2, marginTop: 5 }}
          navigateTo="/clients"
        >
          Create
        </PrimaryLinkButton>

      </Container>
    </Box>
  );
}
