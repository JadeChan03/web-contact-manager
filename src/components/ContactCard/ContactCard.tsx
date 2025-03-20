import { Contact } from '../../types/contactTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  contactDeleted,
  selectContactById,
} from '../../redux/slices/contactsSlice';
import { Link as RouterLink } from 'react-router';
import { EntityId } from '@reduxjs/toolkit';

import IconButton from '@mui/joy/IconButton';
import { Card, CardContent, Typography} from '@mui/joy'; // TODO - style alert, <Alert/>
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
    <Card
      sx={{
        p: 3,
        width: 200,
        position: 'relative',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      ></div>
      <Typography sx={{ mb: 1 }}>{`${firstName} ${lastName}`}</Typography>
      <>
        {phones.map((phoneObj, index) => (
          <div key={index}>{phoneObj.phone}</div>
        ))}
      </>

      <CardContent>
        <IconButton onClick={handleDeleteCard} variant="outlined">
          <DeleteIcon />
        </IconButton>
        <IconButton
          component={RouterLink}
          to={`/contact/${id}`}
          variant="outlined"
        >
          <EditIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};
