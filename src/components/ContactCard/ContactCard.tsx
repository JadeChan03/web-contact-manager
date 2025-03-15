import { Contact } from '../../types/contactTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { contactDeleted, selectContactById } from '../../redux/slices/contactsSlice';
import { Card, CardContent, Typography, Button } from '@mui/joy';
import { Link as RouterLink } from 'react-router';
import { EntityId } from '@reduxjs/toolkit';


export const ContactCard: React.FunctionComponent<{ id: EntityId }> = ({
 id
}) => {
  // get 'dispatch' method from the store
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  console.log('id ', id);

  const selectedContact = useAppSelector((contactsState) => selectContactById(contactsState, id));
  const { firstName = 'N/A', lastName = 'N/A', phones = [] } = selectedContact || {};

  console.log('CONTACT CARD ', selectedContact)

  const handleDeleteCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // prevent link navigation
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) {
      dispatch(contactDeleted(id)); 
    }
  };

  return (

    <Card className="contact-card">
        <CardContent component={RouterLink} to={`/contact/${id}`}>
          <Button onClick={handleDeleteCard}>delete card</Button>
          edit here
          <Typography>{`${firstName} ${lastName}`}</Typography>
          <ul>
            {phones.map((phone, index) => (
              <li key={index}>{phone.value}</li>
            ))}
          </ul>
        </CardContent>
    </Card>

  );
};
