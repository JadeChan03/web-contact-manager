import { useAppSelector } from '../../redux/hooks';
import { ContactCard } from '../ContactCard/ContactCard';
import { selectContacts } from '../../redux/slices/contactsSlice';
// import { Contact } from '../../types/contactTypes';
import { Stack } from '@mui/joy';

export const ContactList = () => {
  // select all contacts with memoized selectors, which returns an array of objects
  const contacts = useAppSelector(selectContacts);
  console.log('RENDERING CONTACT LIST HERE ', contacts);

  const renderedContacts = contacts.map(({ id }) => (
    <ContactCard id={id} key={id} />
  ));

  return (
    <div className="contactList-container">
      <h2>Contact List:</h2>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {renderedContacts.length < 1
          ? `u have no contacts...`
          : renderedContacts}
      </Stack>
    </div>
  );
};
