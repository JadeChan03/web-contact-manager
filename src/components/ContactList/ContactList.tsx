import { useAppSelector } from '../../redux/hooks';
import { ContactCard } from '../ContactCard/ContactCard';

export const ContactList = () => {
  // Select the `state.contactList` value from the store into the component
  const contacts = useAppSelector((state) => state.contacts);

  const renderedContactList = contacts.map((contact) => (
    <div className="contact-card" key={contact.id}>
      <h3>
        <ContactCard contact={contact} />
      </h3>
    </div>
  ));

  return (
    <section className="contact-list">
      <h2>contact list:</h2>
      {renderedContactList}
    </section>
  );
};
