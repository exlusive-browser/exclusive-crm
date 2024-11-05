import { useState } from 'react';
import { Box } from '@mui/material';
import { ClientCreateForm } from './ClientCreateForm'; // Adjust the import path according to your project structure

export function ClienCreatePage() {
  const [contacts, setContacts] = useState([{ firstName: '', lastName: '', email: '', phone: '' }]);

  const handleAddContact = () => {
    setContacts([...contacts, { firstName: '', lastName: '', email: '', phone: '' }]);
  };

  const handleRemoveContact = (index: number) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  const handleChangeContact = (index: number, field: keyof typeof contacts[number], value: string) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: { xs: "100%", sm: "100vh" },
        backgroundColor: { xs: 'transparent', sm: 'primary.light' },
        padding: { xs: 0, sm: 2 },
      }}
    >
      <ClientCreateForm
        contacts={contacts}
        onAddContact={handleAddContact}
        onRemoveContact={handleRemoveContact}
        onChangeContact={handleChangeContact}
      />
    </Box>
  );
}
