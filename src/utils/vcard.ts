import vCard from 'vcard-creator';
import { Contact } from '../types/contactTypes';
import { nanoid } from 'nanoid';

export const exportContactsToVCard = (contacts: Contact[]) => {
  // iterate over each field to add to vcard
  // note: addCategories not supported
  let contactName = '';
  const vcards = contacts
    .map((contact) => {
      // for file naming
      contactName = `${contact.lastName}_${contact.firstName}`;
      const vcard = new vCard();

      // first and last name
      vcard.addName(contact.lastName || '', contact.firstName || '');

      // phone numbers
      contact.phones.forEach((phone) => {
        vcard.addPhoneNumber(`${phone.phone};${phone.countryCode}:`, 'TEL');
      });

      // emails
      contact.emails.forEach((email) => {
        vcard.addEmail(email.email);
      });

      // addresses
      contact.addresses.forEach((address) => {
        vcard.addAddress(address.address);
      });

      // organisation
      if (contact.organisation) {
        vcard.addCompany(contact.organisation);
      }

      // web url
      if (contact.webUrl) {
        vcard.addURL(contact.webUrl);
      }

      // notes
      if (contact.notes) {
        vcard.addNote(contact.notes.substring(0, 200)); // enforce charactter limit
      }

      // categories
      if (contact.categories.length > 0) {
        vcard.addCategories(contact.categories.map((c) => c.category));
      }

      // tags
      if (contact.tags.length > 0) {
        vcard.setProperty(
          'X-TAGS', // TS expecting 'Element'
          'X-TAGS',
          contact.tags.map((t) => t.tag).join(',')
        );
      }
      return vcard.toString();
    })
    .join('\n');
  // combine all contacts into single vcard file
  console.log('downloaded ', vcards);
  const blob = new Blob([vcards], { type: 'text/vcard' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${contactName}_contact_export_${new Date().toISOString()}.vcf`;
  link.click();
};

export const importContactsFromVCard = (file: File): Promise<Contact[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const vcardData = e.target?.result as string;
        console.log('vcardData ', vcardData);
        const contacts = parseVCard(vcardData); // implement this function
        console.log('contacts parsed ', contacts);
        resolve(contacts);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

export const parseVCard = (vcardData: string): Contact[] => {
  console.log('vcardData on import !!! ', vcardData);

  const decodeValue = (value: string) => {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  };

  const vcards = vcardData.split(/END:VCARD\r?\n/i);
  return vcards.reduce<Contact[]>((contacts, rawVcard) => {
    const vcard = rawVcard.trim();
    if (!vcard) return contacts;

    const contact: Contact = {
      id: nanoid(),
      firstName: '',
      lastName: '',
      phones: [],
      emails: [],
      addresses: [],
      categories: [],
      organisation: 'N/A',
      webUrl: 'N/A',
      notes: '',
      tags: [],
    };

    const lines = vcard.split('\n').map((line) => line.trim());

    lines.forEach((line) => {
      if (line.startsWith('N;')) {
        const nameParts = line.split(':')[1].split(';');
        contact.lastName = decodeValue(nameParts[0] || '');
        contact.firstName = decodeValue(nameParts[1] || '');
      } else if (line.startsWith('FN;')) {
        const fullName = decodeValue(line.split(':')[1]);
        const nameParts = fullName.split(/\s+/);
        contact.firstName = nameParts[0] || '';
        contact.lastName = nameParts.slice(1).join(' ') || '';
      } else if (line.startsWith('TEL;')) {
        const phoneParts = line.split(':')[1].split(';');
        const phoneNumber = decodeValue(phoneParts[0]); // get phone number
        const countryCode = phoneParts.length > 1 ? phoneParts[1] : '';

        console.log('phoneParts ', phoneParts);
        console.log('phoneNumber ', phoneNumber);
        console.log('countryCode ', countryCode);

        contact.phones.push({
          id: nanoid(),
          phone: phoneNumber,
          countryCode: countryCode, // store the country code
        });
      } else if (line.startsWith('EMAIL;')) {
        contact.emails.push({
          id: nanoid(),
          email: decodeValue(line.split(':')[1].toLowerCase()),
        });
      } else if (line.startsWith('ADR;')) {
        const address = decodeValue(line.split(':')[1]);
        // remove trailing semicolons and whitespace
        const cleanedAddress = address.replace(/;+$/, '').trim();
        contact.addresses.push({
          id: nanoid(),
          address: cleanedAddress,
        });
      } else if (line.startsWith('CATEGORIES;')) {
        const categories = line.split(':')[1].split(',');
        contact.categories = categories.map((category) => ({
          id: nanoid(),
          category: decodeValue(category.trim()),
        }));
      } else if (line.startsWith('ORG;')) {
        contact.organisation = decodeValue(line.split(':')[1]);
      } else if (line.startsWith('URL:')) {
        contact.webUrl = decodeValue(line.split(':')[1]);
      } else if (line.startsWith('NOTE;')) {
        contact.notes = decodeValue(line.split(':')[1]);
      } else if (line.startsWith('X-TAGS:')) {
        const tags = line.split(':')[1].split(',');
        contact.tags = tags.map((tag) => ({
          id: nanoid(),
          tag: decodeValue(tag.trim()),
        }));
      }
    });

    // Only add the contact if there's meaningful information
    if (contact.firstName || contact.lastName || contact.phones.length > 0) {
      contacts.push(contact);
    }

    return contacts;
  }, []);
};

