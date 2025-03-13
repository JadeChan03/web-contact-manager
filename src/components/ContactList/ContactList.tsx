import { useAppSelector } from '../../redux/hooks';
import { ContactCard } from '../ContactCard/ContactCard';
import { selectAllContacts } from '../../redux/slices/contactsSlice';
import { type Contact } from '../../types/contactTypes';

export const ContactList = () => {
  // select all contacts with memoized selectors, which returns an array of objects
  const contacts = useAppSelector(selectAllContacts);
  console.log('contacts ', contacts);

  const renderedContacts = contacts.map((contact: Contact) => (
    <ContactCard contact={contact} key={contact.id} />
  ));

  return (
    <section className="contact-list">
      <h2>contact list:</h2>
      {renderedContacts.length < 1 ? `u have no contacts...` : renderedContacts}
    </section>
  );
};
