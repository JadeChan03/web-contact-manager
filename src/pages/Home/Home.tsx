import { ContactList } from '../../components/ContactList/ContactList';
import { Link } from 'react-router';
import { Typography, Button, Box } from '@mui/joy';


export const Home = () => {


  return (
    <>
      <Box display={'flex'} gap={2}>
        <Typography level="h1">Home</Typography>
        <Button variant="outlined" component={Link} to={'/contact'}>
          Add Contact
        </Button>
      </Box>

      <ContactList />
    </>
  );
};
