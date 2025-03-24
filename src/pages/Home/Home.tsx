import { ContactList } from '../../components/ContactList/ContactList';
import { Link } from 'react-router';
import { Typography, Button, Box } from '@mui/joy';

export const Home = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" alignItems="center" gap={2} sx={{ marginBottom: 3 }}>
        <Typography level="h1" sx={{ fontWeight: 'bold' }}>
          Home
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          to={'/contact'}
          sx={{
            borderRadius: '8px',
            padding: '8px 16px',
            textTransform: 'none',
          }}
        >
          Add Contact
        </Button>
      </Box>
      <ContactList />
    </Box>
  );
};
