import { ContactList } from '../../components/ContactList/ContactList';
import { AddContact } from '../../components/AddContact/AddContact.tsx';
// import { Grid } from '@mui/joy';

export const Home = () => {
  return (
    <>
      <h1>people</h1>
      <AddContact />
      <ContactList />
    </>
  );
};

export default Home;
