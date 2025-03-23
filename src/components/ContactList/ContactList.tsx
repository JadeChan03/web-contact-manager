import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { ContactCard } from '../ContactCard/ContactCard';
import {
  selectContacts,
  contactDeleted,
  contactAdded,
} from '../../redux/slices/contactsSlice';
import { Box, Typography, Button } from '@mui/joy';
import { useState } from 'react';
import {
  exportContactsToVCard,
  importContactsFromVCard,
} from '../../utils/vcard';

export const ContactList = () => {
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();

  // selection state
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
    new Set()
  );

  const handleSelectContact = (id: string) => {
    setSelectedContacts((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id); // deselect
      } else {
        newSelection.add(id); // select
      }
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    setSelectedContacts((prev) => {
      if (prev.size === contacts.length) {
        return new Set(); // deselect all
      } else {
        return new Set(contacts.map(({ id }) => id as string)); // select all
      }
    });
  };

  const exportSelectedContacts = () => {
    const selected = contacts.filter(({ id }) =>
      selectedContacts.has(id as string)
    );
    exportContactsToVCard(selected);
  };

  const handleImportContacts = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedContacts = await importContactsFromVCard(file);
      // implement conflict resolution logic
      importedContacts.forEach((contact) => {
        dispatch(contactAdded(contact));
      });
    } catch (error) {
      console.error('Error importing contacts: ', error);
      // show error to user
      alert(error);
    }
  };

  const deleteSelectedContacts = () => {
    selectedContacts.forEach((id) => {
      dispatch(contactDeleted(id));
    });
    setSelectedContacts(new Set());
  };

  return (
    <Box>
      <Box display={'flex'} gap={2} alignItems={'center'}>
        <Box display={'flex'} gap={2} alignItems={'center'}>
          {/* import files */}
          <Typography> Import contacts </Typography>
          <input type="file" accept=".vcf" onChange={handleImportContacts} />
        </Box>
        {/* select all checkbox */}
        <Typography> Select all</Typography>
        <input
          type="checkbox"
          checked={selectedContacts.size === contacts.length}
          onChange={handleSelectAll}
        />
        {/* actions */}
        <Button variant="outlined" onClick={exportSelectedContacts}>
          Export Selected
        </Button>
        <Button variant="outlined" onClick={deleteSelectedContacts}>
          {' '}
          Delete Selected
        </Button>
      </Box>

      {/* contact list */}
      <Box display={'flex'} gap={2}>
        {contacts.map(({ id }) => (
          <ContactCard
            id={id}
            key={id}
            checked={selectedContacts.has(id as string)}
            handleSelectContact={handleSelectContact}
          />
        ))}
      </Box>
    </Box>
  );
};
