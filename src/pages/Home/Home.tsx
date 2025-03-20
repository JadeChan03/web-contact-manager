import { ContactList } from '../../components/ContactList/ContactList';
import { Link as RouterLink } from 'react-router';
// import { Grid } from '@mui/joy';
// import { PageContainer } from '@toolpad/core/PageContainer';
import { Typography, Button } from '@mui/joy';

export const Home = () => {
  return (
    <>
      <Typography level="h1">Home</Typography>
      <Button variant="outlined" component={RouterLink} to={'/add-contact'}>Add Contact</Button>
      <ContactList />
    </>
  );
};

export default Home;
