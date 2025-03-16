import { useState } from 'react';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { contactAdded } from '../../redux/slices/contactsSlice';
import { type Contact } from '../../types/contactTypes';
type ContactField = keyof Contact;
import { PhoneInput } from '../PhoneInput/PhoneInput';
import {
  Textarea,
  Card,
  Button,
  Typography,
  Input,
  FormControl,
  FormHelperText,
  Box,
} from '@mui/joy';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/joy/IconButton';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export const AddContact = () => {
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Contact>({
    defaultValues: {
      id: nanoid(),
      firstName: '',
      lastName: '',
      phones: [{ id: nanoid(), value: '' }],
      emails: [{ id: nanoid(), value: '' }],
      addresses: [{ id: nanoid(), value: '' }],
      categories: [{ id: nanoid(), value: '' }],
      organisation: '',
      webUrl: '',
      notes: '',
      tags: [{ id: nanoid(), value: '' }],
    },
  });

  // watch notes inputs for change
  const notesValue = watch('notes', '');

  // field arrays for dynamic inputs
  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: 'phones',
  });

  // phones -------------------

  const createInput = (
    fieldName: ContactField,
    label: string,
    control: Control<Contact>,
    field: { id: string; value: string; countryCode?: string },
    index: number
  ) => {
    switch (fieldName) {
      case 'phones':
        return (
          <PhoneInput
            fieldName={fieldName}
            index={index}
            control={control}
            defaultValue={field.value}
          />
        );
      case 'addresses':
        return (
          <Input
            {...control.register(`${fieldName}.${index}.value`)}
            placeholder={`add ${label}`}
            defaultValue={field.value}
          />
        );
      case 'emails':
        return (
          <Input
            {...control.register(`${fieldName}.${index}.value`)}
            placeholder={`add ${label}`}
            defaultValue={field.value}
          />
        );
      case 'categories':
        return (
          <Input
            {...control.register(`${fieldName}.${index}.value`)}
            placeholder={`add ${label}`}
            defaultValue={field.value}
          />
        );
      case 'tags':
        return (
          <Input
            {...control.register(`${fieldName}.${index}.value`)}
            placeholder={`add ${label}`}
            defaultValue={field.value}
          />
        );
    }
  };

  const renderDynamicInputs = (
    fields: { id: string; value: string }[],
    fieldName: keyof Contact,
    label: string,
    append: () => void,
    remove: (index: number) => void,
    control: Control<Contact>
  ) => {
    return (
      <>
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ display: 'flex' }}>
            {createInput(fieldName, label, control, field, index)}

            {/* display ADD button instead of REMOVE on input element */}
            {index === fields.length - 1 && fields.length > 1 ? (
              <IconButton
                aria-label="Remove Input"
                onClick={() => remove(index)}
                variant="outlined"
              >
                <RemoveIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="Add Input"
                onClick={append}
                variant="outlined"
              >
                <AddIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </>
    );
  };

  const toggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibility(!visibility);
    reset();
  };

  const onSubmit = (data: Contact) => {
    const newContact = { ...data, id: nanoid() };
    console.log('newContact ', newContact);
    dispatch(contactAdded(newContact));
    setVisibility(false);
    reset();
  };

  const handleCharLimit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    /* CHARACTER LIMIT*/
    if (value.length <= 200) {
      setValue('notes', value);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {visibility ? (
        /* ---- form component ---- */
        <Card
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            justifyContent: 'start',
            border: '1px solid grey',
          }}
        >
          <IconButton onClick={toggleForm}>
            <CloseIcon />
          </IconButton>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              {/* first name */}
              <>
                <Input
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="First name"
                  variant="outlined"
                />
                {errors?.firstName && <span>{errors.firstName.message}</span>}
              </>

              {/* last name */}
              <>
                <Input
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Last name"
                  variant="outlined"
                />
                {errors?.lastName && <span>{errors.lastName.message}</span>}
              </>
            </Box>

            {/* phone numbers */}
            <div>
              {renderDynamicInputs(
                phoneFields,
                'phones',
                'phone',
                () => appendPhone({ id: nanoid(), value: '' }),
                removePhone,
                control
              )}
            </div>

            {/* notes */}
            <FormControl error={notesValue.length >= 200 ? true : false}>
              <Textarea
                {...register('notes')}
                className={errors.notes ? 'error' : ''}
                placeholder="add notes"
                endDecorator={
                  <Typography level="body-xs" sx={{ ml: 'auto' }}>
                    {notesValue.length} character(s)
                  </Typography>
                }
                value={notesValue}
                onChange={handleCharLimit}
              />
              {notesValue.length >= 200 && (
                <FormHelperText>
                  <InfoOutlined />
                  Character limit reached
                </FormHelperText>
              )}
            </FormControl>

            <Button type="submit" variant="outlined">
              Submit form
            </Button>
          </form>
        </Card>
      ) : (
        <Button onClick={toggleForm} variant="outlined">
          Add new contact
        </Button>
      )}
    </Box>
  );
};
