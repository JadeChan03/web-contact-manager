import { useState } from 'react';
import { useForm, useFieldArray, Control } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { contactAdded } from '../../redux/slices/contactsSlice';
import { type Contact } from '../../types/contactTypes';
type ContactField = keyof Contact;
// import { useOnSubmit } from '../../hooks/hooks';

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
            <input
              {...control.register(`${fieldName}.${index}.value`)}
              placeholder={`add ${label}`}
              defaultValue={field.value}
            />
            <button type="button" onClick={() => remove(index)}>
              x
            </button>
          </div>
        ))}
        <button type="button" onClick={append}>
          add {label}
        </button>
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
    <>
      <button onClick={toggleForm}>
        {visibility ? 'close form' : 'add new contact'}
      </button>

      {visibility && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* first name */}
          <div>
            <label>first name</label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              className={errors.firstName ? 'error' : ''}
            />
            {errors?.firstName && <span>{errors.firstName.message}</span>}
          </div>

          {/* last name */}
          <div>
            <label>last name</label>
            <input
              {...register('lastName', { required: 'last name is required' })}
              className={errors.lastName ? 'error' : ''}
            />
            {errors?.lastName && <span>{errors.lastName.message}</span>}
          </div>

          {/* phone numbers */}
          <div>
            <label>Phone Numbers</label>
            {renderDynamicInputs(
              phoneFields,
              'phones',
              'phone',
              () => appendPhone({ id: nanoid(), value: '' }),
              removePhone,
			  control as Control<Contact>
            )}
          </div>

          <button type="submit">submit form</button>
        </form>
      )}
    </>
  );
};
