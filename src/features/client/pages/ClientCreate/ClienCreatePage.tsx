import { Box } from '@mui/material';
import { ClientCreateForm } from './ClientCreateForm';

export function ClienCreatePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        backgroundColor: { xs: 'transparent', sm: 'primary.light' },
        padding: { xs: 0, sm: "0 30px" },
      }}
    >
      <ClientCreateForm />

    </Box>
  );
}
