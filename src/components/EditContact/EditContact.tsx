import { useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { EntityId, nanoid } from '@reduxjs/toolkit';
import {
  contactUpdated,
  selectContactById,
} from '../../redux/slices/contactsSlice';
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
import { NotesInput } from '../NotesInput/NotesInput';
// MUI/JOY IMPORTS
import { Card, Button, Box, IconButton, Stack, Typography } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';

export const EditContact = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const selectedContact = useAppSelector((state) =>
    selectContactById(state, id as EntityId)
  ) as Contact;
  console.log('selectedContact ', selectedContact);

  useEffect(() => {
    if (!selectedContact && id) {
      console.error('No contact found for id: ', id);
      navigate('/');
    }
  }, [selectedContact, id, navigate]);

  // create react hook form
  const methods = useForm<Contact>({
    defaultValues: selectedContact || {
      id: nanoid(),
      firstName: '',
      lastName: '',
      phones: [{ id: nanoid(), phone: '', countryCode: null } as Phone],
      emails: [{ id: nanoid(), email: '' } as Email],
      addresses: [{ id: nanoid(), address: '' } as Address],
      categories: [{ id: nanoid(), category: '' } as Category],
      organisation: '',
      webUrl: '',
      notes: '',
      tags: [{ id: nanoid(), tag: '' } as Tag],
    },
  });

  const { control, handleSubmit, reset } = methods;

  // phones
  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: 'phones' });
  console.log('Phone Fields ', phoneFields);

  // emails
  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({ control, name: 'emails' });

  // addresses
  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({ control, name: 'addresses' });

  // categories
  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({ control, name: 'categories' });

  // tags
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({ control, name: 'tags' });

  const onSubmit = (data: Contact) => {
    if (!id) return;

    // Id and changes must be passed separately
    dispatch(contactUpdated({ id, changes: data }));

    reset();
    navigate('/');
  };

  // redirect if the contact is not found
  useEffect(() => {
    if (!selectedContact && id) {
      console.error('No contact found for the given ID:', id);
      navigate('/'); // redirect to home or another page
    }
  }, [selectedContact, id, navigate]);

  return (
    <Card sx={{ p: 5, width: 500 }}>
      <IconButton
        onClick={() => {
          reset();
          navigate('/');
        }}
        variant="outlined"
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
                append={appendPhone}
                dataShape={
                  { id: nanoid(), phone: '', countryCode: '' } as Phone
                }
              />
            </Box>
            {phoneFields.map((field, index) => (
              <Box key={field.id} sx={{ display: 'flex', gap: 1 }}>
                <PhoneInput index={index} />
                <RemoveField
                  index={index}
                  remove={removePhone}
                  disabled={addressFields.length <= 1}
                />
              </Box>
            ))}
            {/* --- EMAIL --- */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography level="h4">Email</Typography>
              <AddField
                fieldName={'emails'}
                append={appendEmail}
                dataShape={{ id: nanoid(), email: '' } as Email}
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
                  disabled={addressFields.length <= 1}
                />
              </Box>
            ))}
            {/* --- ADDRESS--- */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography level="h4">Address</Typography>
              <AddField
                fieldName={'addresses'}
                append={appendAddress}
                dataShape={{ id: nanoid(), address: '' } as Address}
              />
            </Box>
            {addressFields.map((field, index) => (
              <Box key={field.id} sx={{ display: 'flex', gap: 1 }}>
                <SingleInput
                  fieldName={`addresses.${index}.address`}
                  placeholder="Enter address"
                  required={false}
                />
                <RemoveField
                  index={index}
                  remove={removeAddress}
                  disabled={addressFields.length <= 1}
                />
              </Box>
            ))}
            {/* --- CATEGORIES --- */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography level="h4">Categories</Typography>
              <AddField
                fieldName={'categories'}
                append={appendCategory}
                dataShape={{ id: nanoid(), category: '' } as Category}
              />
            </Box>
            {categoryFields.map((field, index) => (
              <Box key={field.id} sx={{ display: 'flex', gap: 1 }}>
                <SingleInput
                  fieldName={`categories.${index}.category`}
                  placeholder="Enter a new category"
                  required={false}
                />
                <RemoveField
                  index={index}
                  remove={removeCategory}
                  disabled={addressFields.length <= 1}
                />
              </Box>
            ))}
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography level="h4">Tags</Typography>
              <AddField
                fieldName={'tags'}
                append={appendTag}
                dataShape={{ id: nanoid(), tag: '' } as Tag}
              />
            </Box>
            {tagFields.map((field, index) => (
              <Box key={field.id} sx={{ display: 'flex', gap: 1 }}>
                <SingleInput
                  fieldName={`tags.${index}.tag`}
                  placeholder="Enter a tag"
                  required={false}
                />
                <RemoveField
                  index={index}
                  remove={removeTag}
                  disabled={addressFields.length <= 1}
                />
              </Box>
            ))}
            {/* --- SUBMIT FORM --- */}
            <Button type="submit" variant="outlined">
              Update Contact
            </Button>
          </Stack>
        </form>
      </FormProvider>
      {/* ------------------------- END FORM SECTION ---------------------- */}
    </Card>
  );
};