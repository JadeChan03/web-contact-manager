import { useState } from 'react';
import { useForm, useFieldArray, FormProvider, UseFieldArrayAppend } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { contactAdded } from '../../redux/slices/contactsSlice';
import { type Contact, type Phone } from '../../types/contactTypes';
import { PhoneInput } from '../PhoneInput/PhoneInput';
import {
  parsePhoneNumberFromString as parsePhoneNumber,
  // type CountryCallingCode,
  type CountryCode,
} from 'libphonenumber-js';
import { NotesInput } from '../NotesInput/NotesInput';
import {
  // Textarea,
  Card,
  Button,
  Typography,
  Input,
  // FormControl,
  // FormHelperText,
  Box,
  IconButton,
  Stack,
} from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
// import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {AddField, RemoveField} from '../Buttons/Buttons';

export const AddContact = () => {
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState(false);

  /* CREATE REACT HOOK FORM  */
  const methods = useForm<Contact>({
    defaultValues: {
      id: nanoid(),
      firstName: '',
      lastName: '',
      phones: [{ id: nanoid(), phone: '', countryCode: '' } as Phone],
      emails: [{ id: nanoid(), email: '' }],
      addresses: [{ id: nanoid(), addr1: '', addr2: '' }],
      categories: [{ id: nanoid(), category: '' }],
      organisation: '',
      webUrl: '',
      notes: '',
      tags: [{ id: nanoid(), tag: '' }],
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  /* FIELD ARRAYS FOR DYNAMIC INPUTS */
  // phones
  const {
    fields: phoneFields,
    append,
    remove,
  } = useFieldArray({ control, name: 'phones' });
  //   // emails
  //   const {emails: emailFields, append, remove} = useFieldArray({control, name: 'emails'})
  //   // addresses
  //   const { addresses: addressFields, append, remove} = useFieldArray({control, 'addresses'});
  // categories
  //   const {fields: categoryFields, append, remove} = useFieldArray({control, name: 'categories'})
  //   // tags
  //   const {fields: tagFields, append, remove} = useFieldArray({control, name: 'tags'})

  const onSubmit = (data: Contact) => {
    console.log('data ', data);
    console.log('data.phones ', data.phones);
    console.log('data.notes ', data.notes);

    const newContact = {
      ...data,
      phones: data.phones.map((phoneObj) => ({
        ...phoneObj,
        phone:
          parsePhoneNumber(
            phoneObj.phone,
            phoneObj.countryCode as CountryCode
          )?.format('E.164') || phoneObj.phone,
      })),
    };
    dispatch(contactAdded(newContact));
    setVisibility(false);
    reset();
  };

  return (
    <Box
      role={'presentation'}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      {visibility ? (
        <Card sx={{ p: 5, width: 500 }}>
          <IconButton onClick={() => setVisibility(false)} sx={{ ml: 'auto' }}>
            <CloseIcon />
          </IconButton>
          {/* ------------------------- FORM SECTION ---------------------- */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                {/* FIRST NAME */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box>
                    <Input
                      {...register('firstName', {
                        required: 'First name is required',
                      })}
                      placeholder="First name"
                      error={!!errors.firstName}
                      sx={{ width: 200 }}
                    />
                    {errors.firstName && (
                      <Typography color="danger">
                        {errors.firstName.message}
                      </Typography>
                    )}
                  </Box>

                  {/* LAST NAME */}
                  <Box>
                    <Input
                      {...register('lastName', {
                        required: 'Last name is required',
                      })}
                      placeholder="Last name"
                      error={!!errors.lastName}
                      sx={{ width: 200 }}
                    />
                    {errors.lastName && (
                      <Typography color="danger">
                        {errors.lastName.message}
                      </Typography>
                    )}
                  </Box>
                </Box>
                {/* PHONES */}
                {phoneFields.map((field, index) => (
                  <Box key={field.id} sx={{ display: 'flex', gap: 1 }}>
                    <PhoneInput index={index} />

                    {/* remove button */}
                    <RemoveField index={index} remove={remove}/>
                  </Box>
                ))}
                {/* add button */}
                <AddField fieldName={'phones'} append={append as UseFieldArrayAppend<Contact, "phones">}/>

              {/* NOTES */}
              <NotesInput maxLength={200} placeholder="Enter notes" />

              {/* SUBMIT BTN */}
              <Button type="submit" variant="outlined">
                Save Contact
              </Button>
              </Stack>
            </form>
          </FormProvider>
          {/* ------------------------- END FORM SECTION ---------------------- */}
        </Card>
      ) : (
        <Button onClick={() => setVisibility(true)} variant="outlined">
          {' '}
          Add New Contact
        </Button>
      )}
    </Box>
  );
};
