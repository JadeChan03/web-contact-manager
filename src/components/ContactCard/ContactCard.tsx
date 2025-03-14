import { type Contact } from '../../types/contactTypes';
// import { EntityId, EntityState } from '@reduxjs/toolkit';
// type ContactField = keyof Contact;
import { useAppDispatch } from '../../redux/hooks';
import {
  contactDeleted,
  // selectContactById,
} from '../../redux/slices/contactsSlice';
// import { useParams } from 'react-router-dom';

export const ContactCard: React.FunctionComponent<{contact: Contact}> = ( { contact } ) => {
  // get 'dispatch' method from the store
  const dispatch = useAppDispatch()

  const { id, firstName, lastName, phones } = contact;

  const handleDeleteCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // dispatch delete contact action -> updates redux state
    dispatch(contactDeleted(id));
  };

  return (
    <div className="contact-card">
      <button onClick={handleDeleteCard}>delete card</button>
      <div>
        <h1>{`${firstName} ${lastName}`}</h1>
      </div>
      <ul>
        {phones.map((phone, index) => (
          <li key={index}>{phone}</li>
        ))}
      </ul>
    </div>
  );
};
