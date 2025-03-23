import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
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
import { NotesInput } from '../NotesInput/NotesInput';
// MUI/JOY IMPORTS
import {
  Card,
  Button,
  Box,
  IconButton,
  Stack,
  Typography,
  // Input,
  // Chip,
} from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export const AddContact = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // states for disabling add/remove field buttonss

  /* ----- CREATE REACT HOOK FORM -----  */
  const methods = useForm<Contact>({
    defaultValues: {
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
    console.log('data ', data);

    // TODO - implement filtering of blank inputs

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
                  disabled={index === 0}
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
                  disabled={index === 0}
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
                  disabled={index === 0}
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
                  disabled={index === 0}
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
                  placeholder="Enter a new category"
                  required={false}
                />
                <RemoveField
                  index={index}
                  remove={removeTag}
                  disabled={index === 0}
                />
              </Box>
            ))}

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
