import { Contact } from '../../types/contactTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  contactDeleted,
  selectContactById,
} from '../../redux/slices/contactsSlice';
import { Link as RouterLink } from 'react-router';
import { EntityId } from '@reduxjs/toolkit';

import IconButton from '@mui/joy/IconButton';
import { Card, Typography, Box, Avatar } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ContactCardProps {
  id: EntityId;
}

export const ContactCard: React.FunctionComponent<ContactCardProps> = ({
  id,
}) => {
  const dispatch = useAppDispatch();
  const selectedContact = useAppSelector((state) =>
    selectContactById(state, id)
  ) as Contact;

  if (!selectedContact) {
    return <Typography>Contact not found.</Typography>;
  }

  const {
    firstName,
    lastName,
    phones,
    emails,
    addresses,
    organisation,
    categories,
    webUrl,
    notes,
    tags,
  } = selectedContact;

  const handleDeleteCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // prevent link navigation
    e.preventDefault();
    if (window.confirm(`Delete contact ${firstName} ${lastName}?`)) {
      dispatch(contactDeleted(id));
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        width: 400,
        // height: 400,
        position: 'relative',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      {/* action buttons */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <IconButton onClick={handleDeleteCard} variant="outlined">
          <DeleteIcon />
        </IconButton>
        <IconButton
          component={RouterLink}
          to={`/contact/${id}`}
          variant="outlined"
        >
          <EditIcon/>
        </IconButton>
        <Avatar>{`${firstName[0]}${lastName[0]}`}</Avatar>
      </Box>
      {/* contact name */}
      <Typography
        level="h3"
        sx={{ mb: 1 }}
      >{`${firstName} ${lastName}`}</Typography>

      {/* display phone numbers */}
      {phones.map((phoneObj, index) => (
        <Box key={index}>
          <Typography>{phoneObj.phone}</Typography>
        </Box>
      ))}
      {/* display addresses */}

      {addresses.map((addressObj, index) => (
        <Box key={index}>
          <Typography>{addressObj.address}</Typography>
        </Box>
      ))}
      {/* display emails */}

      {emails.map((emailObj, index) => (
        <Box key={index}>
          <Typography>{emailObj.email}</Typography>
        </Box>
      ))}
      {/* display categories*/}

      {categories.map((categoryObj, index) => (
        <Box key={index}>
          <Typography>{categoryObj.category}</Typography>
        </Box>
      ))}
      {/* display tags*/}
      {tags.map((tagObj, index) => (
        <Box key={index}>
          <Typography>{tagObj.tag}</Typography>
        </Box>
      ))}

      {/* display organisation, website, notes */}
      <Box>
        <Typography sx={{ mb: 1 }}>Organisation: {organisation}</Typography>
        <Typography sx={{ mb: 1 }}>Website: {webUrl}</Typography>
        <Typography sx={{ mb: 1 }}>Notes: {notes}</Typography>
      </Box>
    </Card>
  );
};
