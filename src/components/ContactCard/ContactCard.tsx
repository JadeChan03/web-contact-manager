import { type Contact } from '../../types/contactTypes';

export const ContactCard: React.FC<{ contact: Contact }> = ({ contact }) => (
  <div className='contact-card'>
    {`${contact.firstName} ${contact.lastName}`}
    <br />
	<ul>
    {contact.phones.map((phone, index) => (
		<li key={index}>{phone}</li>
	))}
	</ul>
  <ul>
    {contact.emails.map((email, index) => (
		<li key={index}>{email}</li>
	))}
	</ul>
  <ul>
    {contact.addresses.map((addr, index) => (
		<li key={index}>{addr}</li>
	))}
	</ul>
  </div>
);
