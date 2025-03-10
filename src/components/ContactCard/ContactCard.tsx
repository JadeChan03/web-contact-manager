import { type Contact } from '../../types/contactTypes';

export const ContactCard: React.FC<{ contact: Contact }> = ({contact}) => {
  return <div>
	{contact.firstName}
	<br/>
	{contact.lastName}
  </div>;
};
