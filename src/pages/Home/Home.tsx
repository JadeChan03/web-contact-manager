import { ContactList } from '../../components/ContactList/ContactList';
import { Link } from 'react-router';
import { Typography, Button } from '@mui/joy';

export const Home = () => {
  return (
    <>
      <Typography level="h1">Home</Typography>
      <Button variant="outlined" component={Link} to={'/contact'}>
        Add Contact
      </Button>
      <ContactList />
    </>
  );
};


