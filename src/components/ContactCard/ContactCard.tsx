import { type Contact } from '../../types/contactTypes';
// import { EntityId, EntityState } from '@reduxjs/toolkit';
// type ContactField = keyof Contact;
import { useAppDispatch } from '../../redux/hooks';
// import { useNavigate } from 'react-router-dom';
import {
  contactDeleted,
  // selectContactById,
} from '../../redux/slices/contactsSlice';
// import { useParams } from 'react-router-dom';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/joy';
import { Link as RouterLink } from "react-router";

export const ContactCard: React.FunctionComponent<{ contact: Contact }> = ({
  contact,
}) => {
  // get 'dispatch' method from the store
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const { id, firstName, lastName, phones } = contact;

  const handleDeleteCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // dispatch delete contact action -> updates redux state
    dispatch(contactDeleted(id));
  };

  return (
    <Card className="contact-card">
      <CardActions component={RouterLink} to={`/contact/${id}`}>
      <CardContent>
        <Button onClick={handleDeleteCard}>delete card</Button>
        <Typography>
        {`${firstName} ${lastName}`}
        </Typography>
        <ul>
          {phones.map((phone, index) => (
            <li key={index}>{phone}</li>
          ))}
        </ul>
      </CardContent>
      </CardActions>
    </Card>
  );
};
