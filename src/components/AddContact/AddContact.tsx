import { useState } from 'react';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { contactAdded } from '../../redux/slices/contactsSlice';
import { type Contact } from '../../types/contactTypes';
type ContactField = keyof Contact;

import { Card, CardContent, Typography, Button, Input, Stack, Sheet, Box } from '@mui/joy';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';

export const AddContact = () => {
  const dispatch = useAppDispatch();
  const [visibility, setVisibility] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
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

  // field arrays for dynamic inputs
  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: 'phones',
  });

  const renderDynamicInputs = (
    fields: { id: string; value: string }[],
    fieldName: ContactField,
    label: string,
    append: () => void,
    remove: (index: number) => void,
    control: Control<Contact>
  ) => {
    return (
      <div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <Input
              {...control.register(`${fieldName}.${index}.value`)}
              placeholder={`add ${label}`}
              defaultValue={field.value}
            />
            {fields.length > 1 && (
              <IconButton
                aria-label="Remove Input"
                onClick={() => remove(index)}
                variant="outlined"
              >
                <RemoveIcon />
              </IconButton>
            )}
          </div>
        ))}
        <Button type="button" onClick={append} variant="outlined">
          add {label}
        </Button>
      </div>
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

  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      {visibility ? (
       <Box
       sx={{
         p: 2,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'end',
         justifyContent: 'center',
       }}
     >
          <IconButton onClick={toggleForm}>
            <CloseIcon />
          </IconButton>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* first name */}
            <div>
              <Input
                {...register('firstName', {
                  required: 'First name is required',
                })}
                className={errors.firstName ? 'error' : ''}
                placeholder="First name"
                variant="outlined"
              />
              {errors?.firstName && <span>{errors.firstName.message}</span>}
            </div>

            {/* last name */}
            <div>
           
              <Input
                {...register('lastName', { required: 'last name is required' })}
                className={errors.lastName ? 'error' : ''}
                placeholder="Last name"
                variant="outlined"
              />
              {errors?.lastName && <span>{errors.lastName.message}</span>}
            </div>

            {/* phone numbers */}
            <div>
              <label>Phone numbers</label>
              {renderDynamicInputs(
                phoneFields,
                'phones',
                'phone',
                () => appendPhone({ id: nanoid(), value: '' }),
                removePhone,
                control as Control<Contact>
              )}
            </div>

            {/* notes */}
            <div>
              <Textarea
                {...register('notes')}
                className={errors.notes ? 'error' : ''}
                placeholder="Add notes"
              />
              {errors?.firstName && <span>{errors.firstName.message}</span>}
            </div>

            <Button type="submit" variant="outlined">
              Submit form
            </Button>
          </form>
  
        </Box>
      ) : (
        <Button onClick={toggleForm} variant="outlined">
          Add new contact
        </Button>
      )}
    </Box>
  );
};
