import { useAppSelector } from '../../redux/hooks';
// import ContactCard from '../ContactCard/ContactCard';

export const ContactList = () => {
  // Select the `state.contactList` value from the store into the component
  const contactList = useAppSelector((state) => state.contactList);

  const renderedContactList = contactList.map((contactCard) => (
    <div className="contact-card" key={contactCard.id}>
      <h3>
        {contactCard.firstName} {contactCard.lastName}
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
