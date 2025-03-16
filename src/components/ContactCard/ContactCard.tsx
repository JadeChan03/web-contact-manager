import { Contact } from '../../types/contactTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  contactDeleted,
  selectContactById,
} from '../../redux/slices/contactsSlice';
import { Link as RouterLink } from 'react-router';
import { EntityId } from '@reduxjs/toolkit';

import IconButton from '@mui/joy/IconButton';
import { Card, CardContent, Typography, Button } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const ContactCard: React.FunctionComponent<{ id: EntityId }> = ({
  id,
}) => {
  // get 'dispatch' method from the store
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  console.log('id ', id);
  // select current contact from Redux state with id
  const selectedContact = useAppSelector((contactsState) =>
    selectContactById(contactsState, id)
  ) as Contact;
  const {
    firstName = 'N/A',
    lastName = 'N/A',
    phones = [],
  } = selectedContact || {};

  console.log('CONTACT CARD ', selectedContact);

  const handleDeleteCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // prevent link navigation
    e.preventDefault();
    if (
      window.confirm(
        `Are you sure you want to delete ${firstName} ${lastName}?`
      )
    ) {
      dispatch(contactDeleted(id));
    }
  };

  return (
    <Card className="contact-card">
      <Typography>{`${firstName} ${lastName}`}</Typography>
      <ul>
        {phones.map((phone, index) => (
          <li key={index}>{phone.value}</li>
        ))}
      </ul>
      <CardContent>
        <IconButton onClick={handleDeleteCard} variant="outlined"><DeleteIcon/></IconButton>
          <IconButton component={RouterLink} to={`/contact/${id}`} variant="outlined"><EditIcon /></IconButton>
      </CardContent>
    </Card>
  );
};
