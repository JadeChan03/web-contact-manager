import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { SearchContact } from '../SearchContact/SearchContact';
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
  // search term state
  const [searchTerm, setSearchTerm] = useState('');
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
    if (selectedContacts.size === 0) {
      alert('No contacts selected for export.');
      return;
    }
    const selected = contacts.filter(({ id }) =>
      selectedContacts.has(id as string)
    );
    exportContactsToVCard(selected);
  };

  const deleteSelectedContacts = () => {
    if (selectedContacts.size === 0) {
      alert('No contacts selected for export.');
      return;
    }
    if (window.confirm(`Delete selected contacts?`)) {
      selectedContacts.forEach((id) => {
        dispatch(contactDeleted(id));
      });
    }
    setSelectedContacts(new Set());
  };

  const handleImportContacts = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const existingContacts = contacts;

    try {
      const { added, updated, skipped } = await importContactsFromVCard(
        file,
        existingContacts
      );

      // handle added contacts
      added.forEach((contact) => {
        dispatch(contactAdded(contact));
      });

      // handle updated contacts
      // TODO - fix bug, updated contacts still renders new contact card
      for (const contact of updated) {
        const shouldUpdate = window.confirm(
          `Contact ${contact.firstName} ${contact.lastName} already exists. Do you want to update it?`
        );
        if (shouldUpdate) {
          dispatch(contactAdded(contact)); // update existing contact
        }
      }

      // handle skipped contacts
      skipped.forEach((contact) => {
        console.warn(
          `Skipped contact: ${contact.firstName} ${contact.lastName} - already exists.`
        );
      });

      alert(
        `Import complete: ${added.length} added, ${updated.length} updated, ${skipped.length} skipped.`
      );
    } catch (error) {
      console.error('Error importing contacts: ', error);
      alert('Error importing contacts: ' + error);
    }
  };

  // filter contacts based on search term
  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    const phoneNumbers = contact.phones
      .map((phone) => phone.phone)
      .join(', ')
      .toLowerCase();
    const emails = contact.emails
      .map((email) => email.email)
      .join(', ')
      .toLowerCase();
    const addresses = contact.addresses
      .map((address) => address.address)
      .join(', ')
      .toLowerCase();
    const categories = contact.categories
      .map((category) => category.category)
      .join(', ')
      .toLowerCase();
    const webUrl = contact.webUrl.toLowerCase();
    const notes = contact.notes.toLowerCase();
    const tags = contact.tags
      .map((tag) => tag.tag)
      .join(', ')
      .toLowerCase();

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      phoneNumbers.includes(searchTerm.toLowerCase()) ||
      emails.includes(searchTerm.toLowerCase()) ||
      addresses.includes(searchTerm.toLowerCase()) ||
      categories.includes(searchTerm.toLowerCase()) ||
      webUrl.includes(searchTerm.toLowerCase()) ||
      notes.includes(searchTerm.toLowerCase()) ||
      tags.includes(searchTerm.toLocaleLowerCase())
    );
  });

  // group contacts by tags
  const groupedContacts = filteredContacts.reduce(
    (acc, contact) => {
      contact.tags.forEach((tag) => {
        if (!acc[tag.tag]) {
          acc[tag.tag] = [];
        }
        acc[tag.tag].push(contact);
      });
      return acc;
    },
    {} as Record<string, typeof filteredContacts>
  );

  return (
    <Box>
      <Box>
        {/* search bar */}
        <SearchContact searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
      </Box>

      {/* grouped contacts by tags */}
      {Object.entries(groupedContacts).map(([tag, contactList]) => (
        <Box key={tag} marginTop={2}>
          <Typography level="h4">#{tag}</Typography>
          <Box display={'flex'} gap={2}>
            {contactList.map(({ id }) => (
              <ContactCard
                id={id}
                key={id}
                checked={selectedContacts.has(id as string)}
                handleSelectContact={handleSelectContact}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
