// import { useState } from 'react';
import {
  useForm,
  useFieldArray,
  FormProvider,
  UseFieldArrayAppend,
} from 'react-hook-form';
import { Link as RouterLink } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { contactAdded } from '../../redux/slices/contactsSlice';
import {
  Contact,
  Phone,
  Email,
  Address,
  Category,
  Tag,
} from '../../types/contactTypes';
import { AddField, RemoveField } from '../Buttons/Buttons';
import { SingleInput } from '../SingleInput/SingleInput';
import { PhoneInput } from '../PhoneInput/PhoneInput';
// validation helper functions

import { NotesInput } from '../NotesInput/NotesInput';
// MUI/JOY IMPORTS
import { Card, Button, Box, IconButton, Stack, Typography } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';

export const AddContact = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /* ----- CREATE REACT HOOK FORM -----  */
  const methods = useForm<Contact>({
    defaultValues: {
      id: nanoid(),
      firstName: '',
      lastName: '',
      phones: [{ id: nanoid(), phone: '', countryCode: null } as Phone],
      emails: [{ id: nanoid(), email: '' } as Email],
      addresses: [{ id: nanoid(), addr1: '', addr2: '' } as Address],
      categories: [{ id: nanoid(), category: '' } as Category],
      organisation: '',
      webUrl: '',
      notes: '',
      tags: [{ id: nanoid(), tag: '' } as Tag],
    },
  });

  const { control, handleSubmit, reset } = methods;

  /* FIELD ARRAYS FOR DYNAMIC INPUTS */
  // phones
  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: 'phones' });
  // emails
  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({ control, name: 'emails' });
  //   // addresses
  //   const { fields: addressFields, append: appendAddress, remove: removeAddress} = useFieldArray({control, 'addresses'});
  // categories
  //   const {fields: categoryFields, append: appendCategory, removeCategory} = useFieldArray({control, name: 'categories'})
  //   // tags
  //   const {fields: tagFields, append: appendTag, remove: removeTag} = useFieldArray({control, name: 'tags'})

  const onSubmit = (data: Contact) => {
    console.log('data ', data);

    const newContact = {
      ...data,
      
    };
    dispatch(contactAdded(newContact));
    reset();
    navigate('/');
  };

  return (
    <Card sx={{ p: 5, width: 500 }}>
      <IconButton
        onClick={() => {
          reset();
        }}
        variant="outlined"
        component={RouterLink}
        to={'/'}
        sx={{ ml: 'auto' }}
      >
        <CloseIcon />
      </IconButton>
      {/* ------------------------- FORM SECTION -------------------------- */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {/* --- FIRST/LAST NAME --- */}
            <Typography level="h4">Name</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SingleInput
                fieldName="firstName"
                placeholder="First name"
                required={true}
              />
              <SingleInput
                fieldName="lastName"
                placeholder="Last name"
                required={true}
              />
            </Box>
            {/* --- PHONES --- */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography level="h4">Phone</Typography>
              <AddField
                fieldName={'phones'}
                append={appendPhone as UseFieldArrayAppend<Contact, 'phones'>}
              />
            </Box>
            {phoneFields.map((field, index) => (
              <Box key={field.id} sx={{ display: 'flex', gap: 1 }}>
                <PhoneInput index={index} />
                <RemoveField
                  index={index}
                  remove={removePhone}
                  disabled={index === 0 && true}
                />
              </Box>
            ))}
            {/* --- EMAIL --- */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography level="h4">Email</Typography>
              <AddField
                fieldName={'emails'}
                append={appendEmail as UseFieldArrayAppend<Contact, 'emails'>}
              />
            </Box>

            {emailFields.map((field, index) => (
              <Box key={field.id} sx={{ display: 'flex', gap: 1 }}>
                <SingleInput
                  fieldName={`emails.${index}.email`}
                  placeholder="Enter email"
                  required={false}
                  validationType="email"
                />
                <RemoveField
                  index={index}
                  remove={removeEmail}
                  disabled={index === 0 && true}
                />
              </Box>
            ))}

            {/* --- ADDRESS--- */}
            <Typography level="h4">Address</Typography>

            {/* --- CATEGORIES --- */}
            <Typography level="h4">Categories</Typography>

            {/* --- ORGANISATION NAME --- */}
            <Typography level="h4">Organisation Name</Typography>
            <SingleInput
              fieldName="organisation"
              placeholder="Enter organisation"
              required={false}
            />

            {/* --- WEBSITE URL --- */}
            <Typography level="h4">WebSite Url</Typography>
            <SingleInput
              fieldName="webUrl"
              placeholder="Enter url"
              required={false}
              validationType="url"
            />

            {/* --- NOTES --- */}
            <Typography level="h4">Notes</Typography>
            <NotesInput maxLength={200} placeholder="Enter notes" />

            {/* --- TAGS --- */}
            <Typography level="h4">Tags</Typography>

            {/* --- SUBMIT FORM --- */}
            <Button type="submit" variant="outlined">
              Save Contact
            </Button>
          </Stack>
        </form>
      </FormProvider>
      {/* ------------------------- END FORM SECTION ---------------------- */}
    </Card>
  );
};
