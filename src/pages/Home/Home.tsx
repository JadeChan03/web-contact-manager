import { ContactList } from '../../components/ContactList/ContactList';
import { AddContact } from '../../components/AddContact/AddContact.tsx';
import { Grid } from '@mui/joy';
// import { PageContainer } from '@toolpad/core/PageContainer';

export const Home = () => {
  return (
    <>
    <h1>Home</h1>
      <AddContact />
      <ContactList />
    </>
  );
};

export default Home;
